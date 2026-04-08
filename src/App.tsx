import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Cloud,
  Database,
  Globe,
  HelpCircle,
  Network,
  Server,
  Shield,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import "./App.css";

// Navigation items
const navItems = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "part1", label: "Part 1: VM Creation", icon: Server },
  { id: "part2", label: "Part 2: Web & DB", icon: Database },
  { id: "part3", label: "Part 3: Dynamic Website", icon: Globe },
  { id: "part4", label: "Part 4: Security", icon: Shield },
  { id: "part5", label: "Part 5: Cloud Backup", icon: Cloud },
  { id: "part6", label: "Part 6: E-Commerce", icon: Network },
  { id: "challenges", label: "Challenges & Fixes", icon: AlertTriangle },
  { id: "qa", label: "Theoretical Q&A", icon: HelpCircle },
];

// Expandable Q&A Component
function QASection({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string | React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border rounded-lg mb-3 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted transition-colors text-left"
      >
        <span className="font-medium text-foreground">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 bg-background">
          <div className="text-muted-foreground leading-relaxed">{answer}</div>
        </div>
      )}
    </div>
  );
}

// Image Card Component
function ImageCard({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <a href={src} target="_blank" rel="noopener noreferrer">
      <Card className="overflow-hidden">
        <div className="aspect-video  flex items-center justify-center overflow-hidden">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/placeholder.png";
            }}
          />
        </div>
        <CardContent className="p-3">
          <p className="text-sm text-muted-foreground text-center">{caption}</p>
        </CardContent>
      </Card>
    </a>
  );
}

// Challenge Card Component
function ChallengeCard({
  challenge,
  solution,
  severity = "medium",
}: {
  challenge: string;
  solution: string | React.ReactNode;
  severity?: "low" | "medium" | "high";
}) {
  const severityColors = {
    low: "bg-yellow-500/10 border-yellow-500/30",
    medium: "bg-orange-500/10 border-orange-500/30",
    high: "bg-red-500/10 border-red-500/30",
  };

  return (
    <Card className={`border-l-4 ${severityColors[severity]}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              Challenge
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{challenge}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-semibold text-sm text-foreground">
              Solution:
            </span>
            <div className="text-sm text-muted-foreground mt-1">{solution}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("overview");
  const [openQA, setOpenQA] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleQA = (id: string) => {
    setOpenQA(openQA === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="fixed left-0 top-0 h-screen w-72 bg-card border-r z-50 hidden lg:block">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <Cloud className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Cloud Project</span>
            </div>

            <ScrollArea className="h-[calc(100vh-120px)]">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    onClick={() => scrollToSection(item.id)}
                    className="justify-start w-full"
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b lg:hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-primary" />
              <span className="font-bold">Cloud Project</span>
            </div>
            <select
              value={activeSection}
              onChange={(e) => scrollToSection(e.target.value)}
              className="bg-muted px-3 py-1 rounded text-sm"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pt-20 lg:pt-12">
            {/* Overview Section */}
            <section id="overview" className="mb-16">
              <div className="text-center mb-10">
                <Badge variant="outline" className="mb-4">
                  Master 1 IA - Virtualisation and Cloud Computing
                </Badge>
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                  Mini Project Documentation
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                  A comprehensive guide to creating and managing virtual
                  machines, hosting dynamic websites, and implementing cloud
                  security.
                </p>

                {/* Authors */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Project by:</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Badge variant="secondary" className="text-sm px-4 py-1.5">
                    Haraoui Kouceila
                  </Badge>
                  <span className="text-muted-foreground">&</span>
                  <Badge variant="secondary" className="text-sm px-4 py-1.5">
                    Bounader Mohamed Rafik
                  </Badge>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <Card>
                  <CardHeader>
                    <Server className="h-8 w-8 text-blue-500 mb-2" />
                    <CardTitle>2 Virtual Machines</CardTitle>
                    <CardDescription>
                      UBU1 (Web Server) & UBU2 (Database)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Ubuntu 22.04 LTS</li>
                      <li>• Hyper-V virtualization</li>
                      <li>• SSH connectivity enabled</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Globe className="h-8 w-8 text-green-500 mb-2" />
                    <CardTitle>Apache Web Server</CardTitle>
                    <CardDescription>Dynamic website hosting</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• PHP backend scripts</li>
                      <li>• HTML/CSS frontend</li>
                      <li>• Database connectivity</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Database className="h-8 w-8 text-purple-500 mb-2" />
                    <CardTitle>MySQL Database</CardTitle>
                    <CardDescription>Data persistence layer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Users database</li>
                      <li>• Remote access configured</li>
                      <li>• CRUD operations</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Shield className="h-8 w-8 text-red-500 mb-2" />
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Firewall & access control</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• UFW firewall rules</li>
                      <li>• Limited user accounts</li>
                      <li>• IP-based restrictions</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Network className="h-8 w-8 text-orange-500 mb-2" />
                    <CardTitle>Networking</CardTitle>
                    <CardDescription>VM communication</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• SSH between VMs</li>
                      <li>• SCP file transfers</li>
                      <li>• Ping connectivity</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Cloud className="h-8 w-8 text-cyan-500 mb-2" />
                    <CardTitle>Cloud Ready</CardTitle>
                    <CardDescription>Scalable architecture</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Separation of concerns</li>
                      <li>• Backup capabilities</li>
                      <li>• E-commerce prototype</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Part 1: VM Creation */}
            <section id="part1" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <Server className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Part 1: Creating Virtual Machines
                  </h2>
                  <p className="text-muted-foreground">
                    Setting up the infrastructure
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Objective</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Create 2 virtual machines using Ubuntu 22.04 ISO and
                      verify SSH connectivity. The VMs are configured with 1
                      vCPU, 1GB RAM, and 10GB storage each.
                    </p>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <ImageCard
                    src="/assets/check-ssh-connection.png"
                    alt="SSH Connection"
                    caption="SSH connection test between VMs"
                  />
                  <ImageCard
                    src="/assets/find-ip-for-each-vm.png"
                    alt="IP Configuration"
                    caption="IP addresses: UBU1 (172.21.167.197) & UBU2 (172.21.170.174)"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <ImageCard
                    src="/assets/connecting-ubu1-and-ubu2-to-eachother.png"
                    alt="VM Connection"
                    caption="Cross-VM SSH connectivity established"
                  />
                  <ImageCard
                    src="/assets/test-ping-from-host-to-both-vm.png"
                    alt="Ping Test"
                    caption="Host to VM ping verification"
                  />
                </div>

                <ImageCard
                  src="/assets/test-ping-connectivity-from-each-vm-to-the-other.png"
                  alt="VM to VM Ping"
                  caption="Bidirectional ping connectivity between VMs"
                />

                <Card>
                  <CardHeader>
                    <CardTitle>Key Commands Used</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2">
                      <p>
                        <span className="text-green-600">
                          # Check IP address
                        </span>
                      </p>
                      <p>ip a</p>
                      <p>hostname -I</p>
                      <p className="text-green-600 mt-2"># SSH to VM</p>
                      <p>ssh ubu1@172.21.167.197</p>
                      <p>ssh ubu2@172.21.170.174</p>
                      <p className="text-green-600 mt-2"># Test connectivity</p>
                      <p>ping 172.21.167.197</p>
                      <p>ping 172.21.170.174</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Part 2: Web & DB */}
            <section id="part2" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <Database className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Part 2: Installing Applications
                  </h2>
                  <p className="text-muted-foreground">
                    Web server and database setup
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Apache Web Server on VM1</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Installed Apache2 web server on UBU1 to serve web content.
                      Verified functionality through browser and curl.
                    </p>
                    <ImageCard
                      src="/assets/testing-apache-through-ssh-and-browser.png"
                      alt="Apache Test"
                      caption="Apache default page - verified through browser and SSH curl"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>MySQL Database on VM2</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Installed MySQL on UBU2 and created the 'users' database
                      with name and email fields for storing user data.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <ImageCard
                        src="/assets/users-db-in-ubu2.png"
                        alt="Database Creation"
                        caption="Creating the 'users' database"
                      />
                      <ImageCard
                        src="/assets/users-table-properties-ubu2.png"
                        alt="Table Structure"
                        caption="Users table schema definition"
                      />
                      <ImageCard
                        src="/assets/users-samples-in-table-ubu2.png"
                        alt="Sample Data"
                        caption="Sample user records inserted"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Database User Permissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Created 'webuser' account with specific permissions for
                      remote access from VM1's IP address (172.21.167.197).
                    </p>
                    <ImageCard
                      src="/assets/GRANT-permission-to-web-user-of-UBU1.png"
                      alt="Grant Permissions"
                      caption="Granting SELECT, INSERT, UPDATE, DELETE permissions to webuser"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Frontend-Backend Connection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Successfully connected UBU1's web server to UBU2's MySQL
                      database using PHP scripts. Data is retrieved and
                      displayed in HTML tables.
                    </p>
                    <ImageCard
                      src="/assets/UBU1-frontend-connected-to-UBU2-backend.png"
                      alt="Connection Success"
                      caption="Web server successfully retrieving data from MySQL database"
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Part 3: Dynamic Website */}
            <section id="part3" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Part 3: Dynamic Website
                  </h2>
                  <p className="text-muted-foreground">
                    Interactive web application
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Website Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        Welcome page with navigation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        Form to insert new users into database
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        Display all users in a styled table
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        Real-time data synchronization between frontend and
                        backend
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Video Demonstration</CardTitle>
                    <CardDescription>
                      Complete workflow of adding and viewing users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      <video
                        controls
                        className="w-full h-full"
                        src="/assets/video-on-add-view-users-frontend-backend.mp4"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 text-center">
                      Demonstration of the dynamic website: adding users through
                      the form and viewing them in real-time from both web
                      interface and database
                    </p>
                  </CardContent>
                </Card>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Technologies Used</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <Badge className="mb-1">Frontend</Badge>
                          <p className="text-sm text-muted-foreground">
                            HTML5, CSS3, JavaScript
                          </p>
                        </div>
                        <div>
                          <Badge className="mb-1">Backend</Badge>
                          <p className="text-sm text-muted-foreground">
                            PHP 8.x
                          </p>
                        </div>
                        <div>
                          <Badge className="mb-1">Database</Badge>
                          <p className="text-sm text-muted-foreground">
                            MySQL 8.0
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>File Structure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                        <p>/var/www/html/</p>
                        <p className="pl-4">├── index.html</p>
                        <p className="pl-4">├── add-user.php</p>
                        <p className="pl-4">├── view-users.php</p>
                        <p className="pl-4">└── db-test.php</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Part 4: Security */}
            <section id="part4" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-500/10 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Part 4: Networking and Security
                  </h2>
                  <p className="text-muted-foreground">
                    Firewall configuration and access control
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Firewall Configuration (UFW)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Configured UFW (Uncomplicated Firewall) on both VMs to
                      allow only necessary traffic: SSH (port 22) and HTTP/HTTPS
                      (ports 80/443).
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <ImageCard
                        src="/assets/active-firewall-ssh-https-vm1.png"
                        alt="VM1 Firewall"
                        caption="VM1 Firewall: SSH, HTTP, HTTPS allowed"
                      />
                      <ImageCard
                        src="/assets/active-firewall-ssh-ip-vm2.png"
                        alt="VM2 Firewall"
                        caption="VM2 Firewall: SSH allowed, MySQL restricted to VM1 IP"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>File Transfer Between VMs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Used SCP (Secure Copy Protocol) to transfer files between
                      VMs securely over SSH connection.
                    </p>
                    <ImageCard
                      src="/assets/send-files-between-vms-through-scp.png"
                      alt="SCP Transfer"
                      caption="Transferring test files from VM1 to VM2 using SCP"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Account Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Created limited user account 'webmanager' for website
                      management with restricted permissions for security.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <ImageCard
                        src="/assets/create-user-account-webmanager-in-vm1.png"
                        alt="Create User"
                        caption="Creating webmanager user account"
                      />
                      <ImageCard
                        src="/assets/set-permission-for-webmanager-to-access-apache.png"
                        alt="Set Permissions"
                        caption="Setting permissions for Apache directory access"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Part 5: Cloud Backup */}
            <section id="part5" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-cyan-500/10 p-3 rounded-lg">
                  <Cloud className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Part 5: Cloud Backup and Storage
                  </h2>
                  <p className="text-muted-foreground">
                    Data backup and restoration
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Backup Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Database backups can be created using mysqldump and stored
                      in cloud storage services like AWS S3, Google Cloud
                      Storage, or Azure Blob Storage. The backup includes all
                      user data and can be restored to verify data integrity.
                    </p>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm mt-4">
                      <p>
                        <span className="text-green-600">
                          # Create database backup
                        </span>
                      </p>
                      <p>mysqldump -u root -p users &gt; users_backup.sql</p>
                      <p className="text-green-600 mt-2">
                        # Restore from backup
                      </p>
                      <p>mysql -u root -p users &lt; users_backup.sql</p>
                      <p className="text-green-600 mt-2">
                        # Upload to cloud storage
                      </p>
                      <p>aws s3 cp users_backup.sql s3://my-backup-bucket/</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Part 6: E-Commerce */}
            <section id="part6" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <Network className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Part 6: Mini Cloud E-Commerce
                  </h2>
                  <p className="text-muted-foreground">
                    Complete cloud-based prototype
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <ImageCard
                  src={"/assets/diagram.png"}
                  alt={""}
                  caption={"Complete cloud-based Hierarchy "}
                />
              </div>

              <div className=" grid grid-cols-3">
                <ImageCard
                  src={"/assets/ecom/ecom-connection-main-page.png"}
                  alt={""}
                  caption={"Ecommerce Site Main Page "}
                />{" "}
                <ImageCard
                  src={"/assets/ecom/ecom-connection-checkout-page.png"}
                  alt={""}
                  caption={"Ecommerce Site Product Page "}
                />{" "}
                <ImageCard
                  src={"/assets/ecom/ecom-connection-cart-page.png"}
                  alt={""}
                  caption={"Ecommerce Site Cart Page "}
                />
              </div>
            </section>

            <Separator className="my-12" />

            {/* Challenges Section */}
            <section id="challenges" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-500/10 p-3 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Challenges & Solutions</h2>
                  <p className="text-muted-foreground">
                    Problems encountered and how they were resolved
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <ChallengeCard
                  challenge="SSH Connection Refused - When trying to connect to VMs via SSH from the host machine, the connection was refused."
                  solution={
                    <div>
                      <p className="mb-2">
                        The SSH server was not installed by default on Ubuntu.
                        Had to install and start the SSH service:
                      </p>
                      <div className="bg-muted p-3 rounded font-mono text-xs">
                        <p>sudo apt update</p>
                        <p>sudo apt install openssh-server -y</p>
                        <p>sudo systemctl start ssh</p>
                        <p>sudo systemctl enable ssh</p>
                      </div>
                    </div>
                  }
                  severity="high"
                />

                <ChallengeCard
                  challenge="VM Console Keyboard Issues - The UBU2 VM console stopped accepting keyboard input, showing Arabic characters instead."
                  solution={
                    <div>
                      <p className="mb-2">
                        This is a common Hyper-V issue. The solution was to:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>
                          Use SSH instead of the console for all operations
                        </li>
                        <li>
                          Press Ctrl+Alt+Left Arrow to release keyboard capture
                        </li>
                        <li>Switch keyboard layout with Alt+Shift</li>
                      </ol>
                      <p className="mt-2 text-sm">
                        Lesson: Always use SSH once it's configured - it's more
                        reliable than VM consoles.
                      </p>
                    </div>
                  }
                  severity="medium"
                />

                <ChallengeCard
                  challenge="Database Connection Failed - PHP scripts on VM1 couldn't connect to MySQL on VM2."
                  solution={
                    <div>
                      <p className="mb-2">
                        Multiple issues needed to be fixed:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>
                          MySQL bind-address needed to allow remote connections
                        </li>
                        <li>
                          Had to create a dedicated database user with
                          host-specific permissions:
                        </li>
                      </ol>
                      <div className="bg-muted p-3 rounded font-mono text-xs mt-2">
                        <p>
                          CREATE USER 'webuser'@'172.21.167.197' IDENTIFIED BY
                          'password';
                        </p>
                        <p>
                          GRANT SELECT, INSERT, UPDATE, DELETE ON users.* TO
                          'webuser'@'172.21.167.197';
                        </p>
                        <p>FLUSH PRIVILEGES;</p>
                      </div>
                    </div>
                  }
                  severity="high"
                />

                <ChallengeCard
                  challenge="Permission Denied Errors - Couldn't create files in /var/www/html directory."
                  solution={
                    <div>
                      <p className="mb-2">
                        The Apache web directory is owned by root. Solutions:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>
                          Use sudo for file operations: sudo touch filename
                        </li>
                        <li>Change directory ownership for webmanager user:</li>
                      </ol>
                      <div className="bg-muted p-3 rounded font-mono text-xs mt-2">
                        <p>sudo chown -R webmanager:webgroup /var/www/html</p>
                        <p>sudo chmod -R 755 /var/www/html</p>
                      </div>
                    </div>
                  }
                  severity="medium"
                />

                <ChallengeCard
                  challenge="Firewall Blocking Connections - After enabling UFW, database connections were blocked."
                  solution={
                    <div>
                      <p className="mb-2">
                        Had to configure UFW rules properly on VM2:
                      </p>
                      <div className="bg-muted p-3 rounded font-mono text-xs">
                        <p>sudo ufw allow ssh</p>
                        <p>
                          sudo ufw allow from 172.21.167.197 to any port 3306
                        </p>
                        <p>sudo ufw enable</p>
                      </div>
                      <p className="mt-2 text-sm">
                        The key was allowing MySQL port 3306 only from VM1's IP
                        address for security.
                      </p>
                    </div>
                  }
                  severity="medium"
                />
              </div>
            </section>

            <Separator className="my-12" />

            {/* Q&A Section */}
            <section id="qa" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-500/10 p-3 rounded-lg">
                  <HelpCircle className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Theoretical Questions & Answers
                  </h2>
                  <p className="text-muted-foreground">
                    Answers to all questions from the project document
                  </p>
                </div>
              </div>

              {/* Part 1 Q&A */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Part 1: Virtual Machines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QASection
                    question="What is an ISO file and why is it used to install an OS?"
                    answer={
                      <div>
                        <p className="mb-2">
                          An ISO file (International Organization for
                          Standardization) is an archive file that contains an
                          exact copy of a CD, DVD, or Blu-ray disc. It's a disk
                          image that preserves the file system and boot
                          information.
                        </p>
                        <p>
                          <strong>Why it's used for OS installation:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>
                            Contains complete bootable OS installation files
                          </li>
                          <li>
                            Preserves file permissions and directory structure
                          </li>
                          <li>
                            Can be mounted as a virtual drive without physical
                            media
                          </li>
                          <li>
                            Ensures integrity - one file contains everything
                            needed
                          </li>
                          <li>Easy to distribute and download</li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p1q1"}
                    onToggle={() => toggleQA("p1q1")}
                  />
                  <QASection
                    question="What is the difference between installing an OS via ISO and using a pre-configured cloud image?"
                    answer={
                      <div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold mb-1">
                              ISO Installation:
                            </p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Full installation process required</li>
                              <li>More time-consuming (30+ minutes)</li>
                              <li>Complete control over configuration</li>
                              <li>Choose packages and settings</li>
                              <li>Learn the installation process</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-1">Cloud Image:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Pre-installed and configured</li>
                              <li>Quick deployment (minutes)</li>
                              <li>Optimized for cloud environments</li>
                              <li>Cloud-init for initialization</li>
                              <li>Minimal installation footprint</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    }
                    isOpen={openQA === "p1q2"}
                    onToggle={() => toggleQA("p1q2")}
                  />
                  <QASection
                    question="Why use multiple VMs instead of just one?"
                    answer={
                      <div>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            <strong>Separation of Concerns:</strong> Web server
                            and database run independently, preventing resource
                            contention
                          </li>
                          <li>
                            <strong>Security:</strong> Database can be isolated
                            in a private network, reducing attack surface
                          </li>
                          <li>
                            <strong>Scalability:</strong> Each component can be
                            scaled independently based on demand
                          </li>
                          <li>
                            <strong>Fault Isolation:</strong> If one VM fails,
                            the other can continue operating
                          </li>
                          <li>
                            <strong>Maintenance:</strong> Updates and
                            maintenance can be performed on one VM without
                            affecting the other
                          </li>
                          <li>
                            <strong>Real-world Architecture:</strong> Mimics
                            production cloud environments where services are
                            distributed
                          </li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p1q3"}
                    onToggle={() => toggleQA("p1q3")}
                  />
                </CardContent>
              </Card>

              {/* Part 2 Q&A */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Part 2: Web Server and Database
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QASection
                    question="What is a web server and what role does it play in the cloud?"
                    answer={
                      <div>
                        <p className="mb-2">
                          A web server is software that receives HTTP requests
                          from clients (browsers) and responds with web content
                          (HTML, CSS, JavaScript, images).
                        </p>
                        <p>
                          <strong>Role in the cloud:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Serves as the entry point for user requests</li>
                          <li>Handles static content delivery efficiently</li>
                          <li>
                            Processes dynamic content through server-side
                            scripts (PHP, Python, Node.js)
                          </li>
                          <li>
                            Can be load balanced across multiple instances
                          </li>
                          <li>Provides SSL/TLS encryption (HTTPS)</li>
                          <li>Logs access and errors for monitoring</li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p2q1"}
                    onToggle={() => toggleQA("p2q1")}
                  />
                  <QASection
                    question="What is a database and why is it separate from the web server?"
                    answer={
                      <div>
                        <p className="mb-2">
                          A database is an organized collection of data that can
                          be easily accessed, managed, and updated. It provides
                          persistent storage with ACID properties (Atomicity,
                          Consistency, Isolation, Durability).
                        </p>
                        <p>
                          <strong>Why separate from web server:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>
                            <strong>Resource Management:</strong> Databases are
                            I/O intensive, web servers are CPU intensive
                          </li>
                          <li>
                            <strong>Security:</strong> Database can be isolated
                            in a private network
                          </li>
                          <li>
                            <strong>Scalability:</strong> Scale web and database
                            tiers independently
                          </li>
                          <li>
                            <strong>Data Integrity:</strong> Centralized data
                            management prevents corruption
                          </li>
                          <li>
                            <strong>Backup:</strong> Easier to backup and
                            restore database independently
                          </li>
                          <li>
                            <strong>Multiple Applications:</strong> One database
                            can serve multiple web servers
                          </li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p2q2"}
                    onToggle={() => toggleQA("p2q2")}
                  />
                  <QASection
                    question="What does 'client-server connection' mean in this context?"
                    answer={
                      <div>
                        <p className="mb-2">
                          In this project, the client-server connection refers
                          to the communication between:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            <strong>Client (Browser):</strong> Sends HTTP
                            requests to the web server and displays the response
                          </li>
                          <li>
                            <strong>Web Server (Apache on VM1):</strong>{" "}
                            Receives HTTP requests, processes PHP scripts, and
                            returns HTML
                          </li>
                          <li>
                            <strong>Database Server (MySQL on VM2):</strong>{" "}
                            Receives SQL queries from the web server and returns
                            data
                          </li>
                        </ul>
                        <p className="mt-2">
                          The connection follows a request-response pattern
                          where the client initiates communication and the
                          server responds with the requested data or service.
                        </p>
                      </div>
                    }
                    isOpen={openQA === "p2q3"}
                    onToggle={() => toggleQA("p2q3")}
                  />
                </CardContent>
              </Card>

              {/* Part 3 Q&A */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Part 3: Dynamic Website
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QASection
                    question="What is the difference between a static and a dynamic website?"
                    answer={
                      <div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold mb-1">
                              Static Website:
                            </p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Content is fixed and pre-built</li>
                              <li>Same content for all users</li>
                              <li>HTML/CSS/JavaScript files</li>
                              <li>Faster loading (no server processing)</li>
                              <li>Harder to update (edit files)</li>
                              <li>No database required</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-1">
                              Dynamic Website:
                            </p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Content generated on-the-fly</li>
                              <li>Personalized per user/request</li>
                              <li>Server-side processing (PHP, etc.)</li>
                              <li>Slower (requires processing)</li>
                              <li>Easy to update (database)</li>
                              <li>Database integration</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    }
                    isOpen={openQA === "p3q1"}
                    onToggle={() => toggleQA("p3q1")}
                  />
                  <QASection
                    question="What is HTML and what role does it play in a website?"
                    answer={
                      <div>
                        <p className="mb-2">
                          HTML (HyperText Markup Language) is the standard
                          markup language for creating web pages. It defines the
                          structure and content of a webpage using tags and
                          elements.
                        </p>
                        <p>
                          <strong>Role in a website:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>
                            <strong>Structure:</strong> Defines page layout with
                            headings, paragraphs, lists, tables
                          </li>
                          <li>
                            <strong>Content:</strong> Contains text, images,
                            videos, links
                          </li>
                          <li>
                            <strong>Semantics:</strong> Describes meaning of
                            content (header, nav, article, footer)
                          </li>
                          <li>
                            <strong>Foundation:</strong> Works with CSS for
                            styling and JavaScript for interactivity
                          </li>
                          <li>
                            <strong>Accessibility:</strong> Proper HTML helps
                            screen readers and search engines
                          </li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p3q2"}
                    onToggle={() => toggleQA("p3q2")}
                  />
                  <QASection
                    question="Why is it useful to interact with a database via a web form?"
                    answer={
                      <div>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            <strong>User-Friendly Interface:</strong> Forms
                            provide an intuitive way for non-technical users to
                            input data
                          </li>
                          <li>
                            <strong>Data Validation:</strong> Forms can validate
                            input before sending to database (preventing errors)
                          </li>
                          <li>
                            <strong>Security:</strong> Properly designed forms
                            protect against SQL injection and other attacks
                          </li>
                          <li>
                            <strong>Automation:</strong> Data is automatically
                            inserted without manual SQL commands
                          </li>
                          <li>
                            <strong>Accessibility:</strong> Web forms can be
                            accessed from anywhere with a browser
                          </li>
                          <li>
                            <strong>Real-time Updates:</strong> Changes are
                            immediately reflected in the database and can be
                            displayed to other users
                          </li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p3q3"}
                    onToggle={() => toggleQA("p3q3")}
                  />
                </CardContent>
              </Card>

              {/* Part 4 Q&A */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Part 4: Networking and Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QASection
                    question="What is a firewall and why is it important?"
                    answer={
                      <div>
                        <p className="mb-2">
                          A firewall is a network security system that monitors
                          and controls incoming and outgoing network traffic
                          based on predetermined security rules.
                        </p>
                        <p>
                          <strong>Importance:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>
                            <strong>Access Control:</strong> Blocks unauthorized
                            access to systems
                          </li>
                          <li>
                            <strong>Traffic Filtering:</strong> Only allows
                            necessary ports and protocols
                          </li>
                          <li>
                            <strong>Attack Prevention:</strong> Protects against
                            common attacks (DDoS, port scanning)
                          </li>
                          <li>
                            <strong>Network Segmentation:</strong> Isolates
                            different parts of the network
                          </li>
                          <li>
                            <strong>Logging:</strong> Records connection
                            attempts for security analysis
                          </li>
                          <li>
                            <strong>Compliance:</strong> Required by many
                            security standards
                          </li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p4q1"}
                    onToggle={() => toggleQA("p4q1")}
                  />
                  <QASection
                    question="What is the difference between TCP and UDP ports?"
                    answer={
                      <div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold mb-1">
                              TCP (Transmission Control Protocol):
                            </p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Connection-oriented</li>
                              <li>Reliable delivery with acknowledgments</li>
                              <li>Ordered data transmission</li>
                              <li>Error checking and correction</li>
                              <li>Slower due to overhead</li>
                              <li>
                                Used for: HTTP(80), HTTPS(443), SSH(22), FTP(21)
                              </li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-1">
                              UDP (User Datagram Protocol):
                            </p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Connectionless</li>
                              <li>No delivery guarantee</li>
                              <li>No ordering guarantee</li>
                              <li>Minimal error checking</li>
                              <li>Faster, lower latency</li>
                              <li>
                                Used for: DNS(53), DHCP, streaming, gaming
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    }
                    isOpen={openQA === "p4q2"}
                    onToggle={() => toggleQA("p4q2")}
                  />
                  <QASection
                    question="Why limit user accounts on a cloud server?"
                    answer={
                      <div>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            <strong>Principle of Least Privilege:</strong> Users
                            only have permissions they absolutely need
                          </li>
                          <li>
                            <strong>Security:</strong> Limits damage if an
                            account is compromised
                          </li>
                          <li>
                            <strong>Audit Trail:</strong> Easier to track who
                            did what
                          </li>
                          <li>
                            <strong>Prevent Accidental Damage:</strong> Regular
                            users can't delete critical files
                          </li>
                          <li>
                            <strong>Compliance:</strong> Many regulations
                            require access control
                          </li>
                          <li>
                            <strong>Resource Management:</strong> Prevents users
                            from consuming excessive resources
                          </li>
                          <li>
                            <strong>Separation of Duties:</strong> Different
                            roles for different responsibilities
                          </li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p4q3"}
                    onToggle={() => toggleQA("p4q3")}
                  />
                </CardContent>
              </Card>

              {/* Part 5 Q&A */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5" />
                    Part 5: Cloud Backup and Storage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QASection
                    question="Why is it important to back up data in the cloud?"
                    answer={
                      <div>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            <strong>Disaster Recovery:</strong> Protects against
                            hardware failures, natural disasters, or cyber
                            attacks
                          </li>
                          <li>
                            <strong>Data Loss Prevention:</strong> Accidental
                            deletion or corruption can be recovered
                          </li>
                          <li>
                            <strong>Business Continuity:</strong> Minimizes
                            downtime and data loss
                          </li>
                          <li>
                            <strong>Version Control:</strong> Multiple backup
                            versions allow point-in-time recovery
                          </li>
                          <li>
                            <strong>Geographic Redundancy:</strong> Cloud
                            backups are stored in multiple locations
                          </li>
                          <li>
                            <strong>Compliance:</strong> Many regulations
                            require data backup and retention
                          </li>
                          <li>
                            <strong>Cost-Effective:</strong> Cloud storage is
                            cheaper than maintaining physical backup
                            infrastructure
                          </li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p5q1"}
                    onToggle={() => toggleQA("p5q1")}
                  />
                  <QASection
                    question="What is a cloud storage service and how is it different from a local disk?"
                    answer={
                      <div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold mb-1">Cloud Storage:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Data stored on remote servers</li>
                              <li>Accessible from anywhere</li>
                              <li>Pay-as-you-go pricing</li>
                              <li>Automatic redundancy</li>
                              <li>Scalable capacity</li>
                              <li>Requires internet connection</li>
                              <li>Managed by provider</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-1">Local Disk:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Data stored on physical drives</li>
                              <li>Limited to physical access</li>
                              <li>One-time purchase</li>
                              <li>Manual backup needed</li>
                              <li>Fixed capacity</li>
                              <li>No internet required</li>
                              <li>Self-managed</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    }
                    isOpen={openQA === "p5q2"}
                    onToggle={() => toggleQA("p5q2")}
                  />
                  <QASection
                    question="What are the benefits of analyzing data directly in the cloud?"
                    answer={
                      <div>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            <strong>Scalability:</strong> Process large datasets
                            with virtually unlimited computing power
                          </li>
                          <li>
                            <strong>Cost Efficiency:</strong> Pay only for
                            resources used during analysis
                          </li>
                          <li>
                            <strong>No Data Transfer:</strong> Analyze data
                            where it lives (reduces bandwidth costs)
                          </li>
                          <li>
                            <strong>Real-time Analysis:</strong> Process
                            streaming data as it arrives
                          </li>
                          <li>
                            <strong>Collaboration:</strong> Teams can access and
                            analyze data simultaneously
                          </li>
                          <li>
                            <strong>Advanced Tools:</strong> Access to AI/ML
                            services and big data analytics
                          </li>
                          <li>
                            <strong>Security:</strong> Data stays in secure
                            cloud environment
                          </li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p5q3"}
                    onToggle={() => toggleQA("p5q3")}
                  />
                </CardContent>
              </Card>

              {/* Part 6 Q&A */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    Part 6: E-Commerce Deployment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QASection
                    question="Why separate web server and database in production systems?"
                    answer={
                      <div>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            <strong>Performance:</strong> Each server can be
                            optimized for its specific workload
                          </li>
                          <li>
                            <strong>Scalability:</strong> Scale web tier and
                            database tier independently
                          </li>
                          <li>
                            <strong>Security:</strong> Database can be placed in
                            a private subnet with no direct internet access
                          </li>
                          <li>
                            <strong>Resource Isolation:</strong> Database I/O
                            doesn't affect web server response times
                          </li>
                          <li>
                            <strong>Maintenance:</strong> Update or restart one
                            without affecting the other
                          </li>
                          <li>
                            <strong>High Availability:</strong> Easier to
                            implement failover and replication
                          </li>
                          <li>
                            <strong>Team Specialization:</strong> Different
                            teams can manage different components
                          </li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p6q1"}
                    onToggle={() => toggleQA("p6q1")}
                  />
                  <QASection
                    question="What is horizontal scaling in e-commerce platforms?"
                    answer={
                      <div>
                        <p className="mb-2">
                          Horizontal scaling (scaling out) means adding more
                          servers to distribute the load, rather than upgrading
                          a single server (vertical scaling).
                        </p>
                        <p>
                          <strong>In e-commerce:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>
                            <strong>Load Balancing:</strong> Multiple web
                            servers handle requests
                          </li>
                          <li>
                            <strong>High Traffic Handling:</strong> Black
                            Friday, holiday sales
                          </li>
                          <li>
                            <strong>Geographic Distribution:</strong> Servers
                            closer to customers
                          </li>
                          <li>
                            <strong>Fault Tolerance:</strong> If one server
                            fails, others continue
                          </li>
                          <li>
                            <strong>Cost Efficiency:</strong> Add commodity
                            hardware vs. expensive upgrades
                          </li>
                          <li>
                            <strong>Auto-scaling:</strong> Automatically
                            add/remove servers based on demand
                          </li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p6q2"}
                    onToggle={() => toggleQA("p6q2")}
                  />
                  <QASection
                    question="Why is HTTPS mandatory for online stores?"
                    answer={
                      <div>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            <strong>Data Encryption:</strong> Protects sensitive
                            information (credit cards, passwords) in transit
                          </li>
                          <li>
                            <strong>Customer Trust:</strong> Padlock icon shows
                            the site is secure
                          </li>
                          <li>
                            <strong>PCI DSS Compliance:</strong> Required for
                            handling payment card data
                          </li>
                          <li>
                            <strong>SEO Ranking:</strong> Google favors HTTPS
                            websites
                          </li>
                          <li>
                            <strong>Prevent Man-in-the-Middle:</strong> Stops
                            attackers from intercepting data
                          </li>
                          <li>
                            <strong>Authentication:</strong> Verifies the
                            website's identity
                          </li>
                          <li>
                            <strong>Data Integrity:</strong> Ensures data isn't
                            modified during transmission
                          </li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p6q3"}
                    onToggle={() => toggleQA("p6q3")}
                  />
                  <QASection
                    question="What is the role of a reverse proxy?"
                    answer={
                      <div>
                        <p className="mb-2">
                          A reverse proxy sits between clients and backend
                          servers, forwarding client requests to the appropriate
                          server.
                        </p>
                        <p>
                          <strong>Key roles:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>
                            <strong>Load Balancing:</strong> Distribute requests
                            across multiple servers
                          </li>
                          <li>
                            <strong>SSL Termination:</strong> Handle HTTPS
                            encryption/decryption
                          </li>
                          <li>
                            <strong>Caching:</strong> Store static content to
                            reduce backend load
                          </li>
                          <li>
                            <strong>Compression:</strong> Compress responses to
                            save bandwidth
                          </li>
                          <li>
                            <strong>Security:</strong> Hide backend server
                            details, block malicious traffic
                          </li>
                          <li>
                            <strong>Centralized Logging:</strong> Single point
                            for request logging
                          </li>
                          <li>
                            <strong>Path-based Routing:</strong> Route /api to
                            API servers, / to web servers
                          </li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p6q4"}
                    onToggle={() => toggleQA("p6q4")}
                  />
                  <QASection
                    question="Why isolate the database in a private network?"
                    answer={
                      <div>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            <strong>Security:</strong> Database is not directly
                            accessible from the internet
                          </li>
                          <li>
                            <strong>Attack Surface Reduction:</strong> Only
                            application servers can connect
                          </li>
                          <li>
                            <strong>Compliance:</strong> Many regulations
                            require database isolation
                          </li>
                          <li>
                            <strong>Access Control:</strong> Fine-grained
                            control over who can access data
                          </li>
                          <li>
                            <strong>Data Protection:</strong> Most valuable
                            asset (customer data) is protected
                          </li>
                          <li>
                            <strong>Network Segmentation:</strong> Limits
                            lateral movement if web server is compromised
                          </li>
                          <li>
                            <strong>Monitoring:</strong> Easier to detect
                            unauthorized access attempts
                          </li>
                        </ul>
                      </div>
                    }
                    isOpen={openQA === "p6q5"}
                    onToggle={() => toggleQA("p6q5")}
                  />
                </CardContent>
              </Card>
            </section>

            {/* Footer */}
            <footer className="text-center py-8 text-muted-foreground border-t mt-12">
              <p className="font-semibold text-foreground">
                Cloud Computing Mini Project Documentation
              </p>
              <p className="text-sm mt-1">
                Master 1 IA - Virtualisation and Cloud Computing
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Users className="h-4 w-4" />
                <span className="text-sm">
                  By Haraoui Kouceila & Bounader Mohamed Rafik
                </span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
