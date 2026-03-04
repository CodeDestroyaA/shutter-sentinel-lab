import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuoteDialog = ({ open, onOpenChange }: QuoteDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      toast({
        title: "Quote Request Sent!",
        description: "We'll get back to you within 24 hours.",
      });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl tracking-wider">Get a Free Quote</DialogTitle>
          <DialogDescription className="font-body">
            Fill in the form below and we'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input name="name" placeholder="Your Name" required maxLength={100} className="font-body" />
          <Input name="phone" type="tel" placeholder="Phone Number" required className="font-body" />

          <Select name="service" required>
            <SelectTrigger className="font-body">
              <SelectValue placeholder="Service Required" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shutter-install">New Roller Shutter Installation</SelectItem>
              <SelectItem value="shutter-repair">Emergency Shutter Repair</SelectItem>
              <SelectItem value="maintenance">General Maintenance/Service</SelectItem>
            </SelectContent>
          </Select>

          <Select name="area">
            <SelectTrigger className="font-body">
              <SelectValue placeholder="Your Area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kempton-park">Kempton Park</SelectItem>
              <SelectItem value="isando">Isando</SelectItem>
              <SelectItem value="jet-park">Jet Park</SelectItem>
              <SelectItem value="spartan">Spartan</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Textarea name="message" placeholder="Briefly describe your needs..." maxLength={1000} rows={3} className="font-body" />

          <Button type="submit" className="w-full font-display tracking-wider" disabled={loading}>
            {loading ? "Sending..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;
