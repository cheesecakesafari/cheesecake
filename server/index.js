import express from 'express';
import multer from 'multer';
import { MongoClient, ObjectId, GridFSBucket } from 'mongodb';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8787;

app.use(cors());
app.use(express.json());

// Multer memory storage to receive uploaded image
const upload = multer({ storage: multer.memoryStorage() });

// MongoDB setup
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI is not set. Set it to your MongoDB connection string.');
  process.exit(1);
}

const client = new MongoClient(mongoUri);
await client.connect();
const db = client.db(process.env.MONGODB_DB || undefined);
const commentsCol = db.collection('comments');
const bucket = new GridFSBucket(db, { bucketName: 'gallery' });

function uploadToGridFS(file) {
  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
    });
    uploadStream.end(file.buffer);
    uploadStream.on('finish', (result) => {
      resolve(result._id);
    });
    uploadStream.on('error', reject);
  });
}

app.post('/api/comments', upload.single('image'), async (req, res) => {
  try {
    const { name, email, phone, comment, rating } = req.body;
    if (!name || !comment) return res.status(400).json({ error: 'Name and comment are required' });

    let imageFileId = null;
    if (req.file) {
      imageFileId = await uploadToGridFS(req.file);
    }

    const doc = {
      name,
      email: email || null,
      phone: phone || null,
      comment,
      rating: Number(rating || 5),
      created_at: new Date(),
      is_approved: true,
      image_file_id: imageFileId,
    };

    const result = await commentsCol.insertOne(doc);

    const inserted = await commentsCol.findOne({ _id: result.insertedId });

    // Map image id to a public URL path
    if (inserted.image_file_id) {
      inserted.image_url = `/images/${inserted.image_file_id}`;
    }

    res.json(inserted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/comments', async (req, res) => {
  try {
    const docs = await commentsCol.find({ is_approved: true }).sort({ created_at: -1 }).limit(10).toArray();
    const mapped = docs.map(d => ({
      id: d._id.toString(),
      name: d.name,
      comment: d.comment,
      rating: d.rating,
      created_at: d.created_at,
      image_url: d.image_file_id ? `/images/${d.image_file_id}` : null,
    }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/images/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = typeof id === 'string' && id.length === 24 ? new ObjectId(id) : id;
    const downloadStream = bucket.openDownloadStream(objectId);
    downloadStream.on('error', (err) => {
      res.status(404).end();
    });
    downloadStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

// Serve static public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(PORT, () => {
  console.log(`Comments API server (MongoDB) listening on http://localhost:${PORT}`);
});
