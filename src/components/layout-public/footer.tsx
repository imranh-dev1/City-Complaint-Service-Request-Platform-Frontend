import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  FileText,
  HelpCircle,
  Users,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assests/logo/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {
      label: "Report Complaint",
      href: "/complaints/new",
      icon: FileText,
    },
    {
      label: "Track Complaint",
      href: "/complaints/track",
      icon: Shield,
    },
    {
      label: "My Complaints",
      href: "/dashboard",
      icon: Users,
    },
    {
      label: "Help Center",
      href: "/help",
      icon: HelpCircle,
    },
  ];

  const departments = [
    {
      label: "Public Works",
      href: "/departments/public-works",
    },
    {
      label: "Water Supply",
      href: "/departments/water",
    },
    {
      label: "Electricity",
      href: "/departments/electricity",
    },
    {
      label: "Sanitation",
      href: "/departments/sanitation",
    },
    {
      label: "Traffic & Roads",
      href: "/departments/traffic",
    },
  ];

  const legalLinks = [
    {
      label: "Privacy Policy",
      href: "/privacy",
    },
    {
      label: "Terms of Service",
      href: "/terms",
    },
    {
      label: "Cookie Policy",
      href: "/cookies",
    },
    {
      label: "Accessibility",
      href: "/accessibility",
    },
  ];

  return (
    <footer className="border-t bg-muted/30 text-muted-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex">
              <Image
                src={Logo}
                alt="CityCare Logo"
                width={120}
                height={40}
                className="h-auto w-[120px] object-contain"
              />
            </Link>

            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Empowering citizens to report issues and track resolutions.
              Together, we build a better city.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-1">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <FaFacebook className="h-4 w-4" />
              </Link>

              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <FaTwitter className="h-4 w-4" />
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <FaLinkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm transition-colors hover:text-primary"
                    >
                      <Icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Departments
            </h4>

            <ul className="space-y-3">
              {departments.map((dept) => (
                <li key={dept.label}>
                  <Link
                    href={dept.href}
                    className="text-sm transition-colors hover:text-primary"
                  >
                    {dept.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Contact Us
            </h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <span className="leading-6">
                  City Municipal Corporation
                  <br />
                  Main Road, City Center
                  <br />
                  State - 123456
                </span>
              </li>

              <li>
                <a
                  href="tel:+911234567890"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>+91 123 456 7890</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:support@citycare.gov"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>support@citycare.gov</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {currentYear} CityCare Complaint Platform. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
