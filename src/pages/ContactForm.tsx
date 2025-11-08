import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type ContactFormProps = {
  compact?: boolean;
  onClose?: () => void;
};

const ContactForm = ({ compact = false, onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log("Form submitted:", formData);
    // Mark as submitted and keep the message in-panel
    setSubmitted(true);
    // Optionally clear the form data
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={compact ? "" : "min-h-screen bg-gradient-subtle py-8"}>
      <div className={compact ? "" : "container mx-auto px-4"}>
  <Card className={compact ? "w-full" : "max-w-2xl mx-auto"}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-6">
                <h4 className="text-lg font-semibold">Thank you!</h4>
                <p className="text-sm text-muted-foreground mt-2">We will get back to you soon.</p>
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={() => {
                      if (onClose) {
                        onClose();
                      } else {
                        setSubmitted(false);
                      }
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message"
                    rows={compact ? 4 : 5}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;
