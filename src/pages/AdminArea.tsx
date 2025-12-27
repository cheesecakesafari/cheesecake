import { useState } from 'react';
import AdminGate from '@/components/AdminGate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  Image, 
  MapPin, 
  Users, 
  Settings,
  Menu
} from 'lucide-react';
import { CompanyCarsManagement } from '@/components/admin/CompanyCarsManagement';
import { WebsiteImagesManagement } from '@/components/admin/WebsiteImagesManagement';
import { SafariPackagesManagement } from '@/components/admin/SafariPackagesManagement';
import { BookingsManagement } from '@/components/admin/BookingsManagement';

export default function AdminArea() {
  const [activeTab, setActiveTab] = useState('cars');

  return (
    <AdminGate>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <Settings className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your safari tour business
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Menu className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cars" className="flex items-center space-x-2">
                <Car className="h-4 w-4" />
                <span className="hidden sm:inline">Company Cars</span>
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center space-x-2">
                <Image className="h-4 w-4" />
                <span className="hidden sm:inline">Website Images</span>
              </TabsTrigger>
              <TabsTrigger value="packages" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Safari Packages</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Bookings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cars" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Car className="h-5 w-5" />
                    <span>Company Cars Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CompanyCarsManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Image className="h-5 w-5" />
                    <span>Website Images Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <WebsiteImagesManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="packages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Safari Packages Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SafariPackagesManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Client Bookings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BookingsManagement />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AdminGate>
  );
}