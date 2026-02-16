import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSendMessage } from "@/hooks/use-portfolio";
import { insertMessageSchema } from "@/schema";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// Extend schema for frontend validation messages
const formSchema = insertMessageSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const sendMessage = useSendMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    sendMessage.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg space-y-6"
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.name ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary/20 focus:border-primary'} focus:outline-none focus:ring-4 transition-all duration-200`}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="john@example.com"
          className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.email ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary/20 focus:border-primary'} focus:outline-none focus:ring-4 transition-all duration-200`}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell me about your project..."
          className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.message ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary/20 focus:border-primary'} focus:outline-none focus:ring-4 transition-all duration-200 resize-none`}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-destructive mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>
    </motion.form>
  );
}
