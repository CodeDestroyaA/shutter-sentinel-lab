import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuoteDialog = ({ open, onOpenChange }: QuoteDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState<string[]>([]);

  const togglePropertyType = (type: string) => {
    setPropertyType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      setPropertyType([]);
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

          <div className="space-y-2">
            <Label className="font-display text-sm tracking-wider">Property Type</Label>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="residential"
                  checked={propertyType.includes("residential")}
                  onCheckedChange={() => togglePropertyType("residential")}
                />
                <Label htmlFor="residential" className="font-body text-sm cursor-pointer">Residential</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="commercial"
                  checked={propertyType.includes("commercial")}
                  onCheckedChange={() => togglePropertyType("commercial")}
                />
                <Label htmlFor="commercial" className="font-body text-sm cursor-pointer">Commercial</Label>
              </div>
            </div>
          </div>

          <Select name="service" required>
            <SelectTrigger className="font-body">
              <SelectValue placeholder="Service Required" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shutter-install">Roller Shutter Install</SelectItem>
              <SelectItem value="shutter-repair">Roller Shutter Repair</SelectItem>
              <SelectItem value="shutter-maintenance">Roller Shutter Maintenance</SelectItem>
              <SelectItem value="sectional-door">Sectional Door Install</SelectItem>
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
              <SelectItem value="edenvale">Edenvale</SelectItem>
              <SelectItem value="bedfordview">Bedfordview</SelectItem>
              <SelectItem value="benoni">Benoni</SelectItem>
              <SelectItem value="boksburg">Boksburg</SelectItem>
              <SelectItem value="sandton">Sandton</SelectItem>
              <SelectItem value="midrand">Midrand</SelectItem>
              <SelectItem value="centurion">Centurion</SelectItem>
              <SelectItem value="johannesburg">Johannesburg</SelectItem>
              <SelectItem value="pomona">Pomona</SelectItem>
              <SelectItem value="germiston">Germiston</SelectItem>
              <SelectItem value="chloorkop">Chloorkop</SelectItem>
              <SelectItem value="brentwood">Brentwood</SelectItem>
              <SelectItem value="beyers-park">Beyers Park</SelectItem>
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
