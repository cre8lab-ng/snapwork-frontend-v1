import { useState } from "react";
import Icon from "./icon";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { FormikHelpers } from "formik";
import { Input,Form } from "./ui/form";
import { Button } from "./ui/button";

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const isOpen = (section: string) => openSection === section;

  // Newsletter form validation schema
  const newsletterValidationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
  });

  // Newsletter form initial values
  const newsletterInitialValues = {
    email: "",
  };

  // Newsletter form submission handler
  const handleNewsletterSubmit = async (
    values: { email: string },
    { setSubmitting, resetForm }: FormikHelpers<{ email: string }>
  ) => {
    try {
      console.log("Newsletter subscription:", values);
      // Here you would typically send the email to your newsletter service
      alert("Thank you for subscribing to our newsletter!");
      resetForm();
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      alert(
        "There was an error subscribing to the newsletter. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-darkblue text-white section-spacing px-16">
      <div className="mx-auto">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Newsletter signup section */}
          <div className="lg:col-span-2 lg:pr-8">
            <h2 className="text-subtitle component-spacing leading-relaxed !text-white">
              Stay updated with Snapwork by signing up for our newsletter
            </h2>
            <Form
              initialValues={newsletterInitialValues}
              validationSchema={newsletterValidationSchema}
              onSubmit={handleNewsletterSubmit}
              className="space-y-6"
            >
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                className="w-full rounded-lg px-6 py-4 text-blue-300 border border-gray-300 placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <Button
                type="submit"
                variant="secondary"
                className="w-auto px-10 py-3"
              >
                Subscribe
              </Button>
            </Form>
          </div>

          {/* Company section */}
          <div className="lg:col-span-1">
            <div
              className="flex justify-between items-center lg:block cursor-pointer lg:cursor-default"
              onClick={() => toggleSection("company")}
            >
              <h3 className="text-medium font-semibold element-spacing tracking-wide !text-white">
                COMPANY
              </h3>
              <div className="lg:hidden">
                <Image
                  src="/images/dropdown.svg"
                  alt="Dropdown"
                  width={20}
                  height={20}
                  className={`transform transition-transform filter invert ${
                    isOpen("company") ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <ul
              className={`space-y-3 lg:block ${
                isOpen("company") ? "block" : "hidden lg:block"
              } text-blue-100`}
            >
              <li className="hover:text-white cursor-pointer transition-colors font-medium">
                <Link href="/about">About Us</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors font-medium">
                <Link href="/join-us">Join as a service provider</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors font-medium">
                <Link href="/terms-of-use">Terms of use</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors font-medium">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links section */}
          <div className="lg:col-span-1">
            <div
              className="flex justify-between items-center lg:block cursor-pointer lg:cursor-default"
              onClick={() => toggleSection("quick")}
            >
              <h3 className="text-medium font-semibold element-spacing tracking-wide !text-white">
                QUICK LINKS
              </h3>
              <div className="lg:hidden">
                <Image
                  src="/images/dropdown.svg"
                  alt="Dropdown"
                  width={20}
                  height={20}
                  className={`transform transition-transform filter invert ${
                    isOpen("quick") ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <ul
              className={`space-y-3 lg:block ${
                isOpen("quick") ? "block" : "hidden lg:block"
              } text-blue-100`}
            >
              <li className="hover:text-white cursor-pointer transition-colors font-medium">
                <a
                  href="https://book-snapwork.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Book Now
                </a>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors font-medium">
                <Link href="/faq">FAQ</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors font-medium">
                <Link href="/get-a-quote">Get a quote</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors font-medium">
                <Link href="/services">Services</Link>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div className="lg:col-span-1">
            <div
              className="flex justify-between items-center lg:block cursor-pointer lg:cursor-default"
              onClick={() => toggleSection("contact")}
            >
              <h3 className="text-medium font-semibold element-spacing tracking-wide !text-white">
                CONTACT
              </h3>
              <div className="lg:hidden">
                <Image
                  src="/images/dropdown.svg"
                  alt="Dropdown"
                  width={20}
                  height={20}
                  className={`transform transition-transform filter invert ${
                    isOpen("contact") ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <ul
              className={`space-y-4 lg:block ${
                isOpen("contact") ? "block" : "hidden lg:block"
              } text-blue-100`}
            >
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Icon name="mail" />
                <Link href="mailto:snap@work.ng" className="font-medium">
                  snap@work.ng
                </Link>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Icon name="whatsapp" />
                <Link
                  href="https://wa.me/23404059336711"
                  className="font-medium"
                >
                  +23404059336711
                </Link>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Icon name="phone" />
                <Link href="tel:+23404059336711" className="font-medium">
                  +23404059336711
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with logo and social icons */}
        <div className="mt-16 pt-8 border-t border-blue-700/50 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex-shrink-0">
            <Image
              src="/images/snapwork-logo-white.svg"
              alt="Snapwork Logo"
              width={0}
              height={0}
              className="w-auto h-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="hover:scale-110 transition-transform cursor-pointer">
              <Icon name="linkedIn-bg" />
            </div>
            <div className="hover:scale-110 transition-transform cursor-pointer">
              <Icon name="instagram-bg" />
            </div>
            <div className="hover:scale-110 transition-transform cursor-pointer">
              <Icon name="mail-bg" />
            </div>
            <div className="hover:scale-110 transition-transform cursor-pointer">
              <Icon name="twitter-bg" />
            </div>
            <div className="hover:scale-110 transition-transform cursor-pointer">
              <Icon name="whatsapp-bg" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
