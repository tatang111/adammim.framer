"use client";

import InputSection from "@/components/InputSection";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import emailjs from "emailjs-com";
import { toast } from "sonner";

const schema = z.object({
  username: z.string().nonempty("Required"),
  email: z.string().email("Email is invalid").nonempty("Required"),
  phone: z.string(),
  service: z.enum(["graphic-design", "mockup", "ui-design", "video-editing"], {
    required_error: "Please select one",
  }),
  message: z.string().nonempty("Required"),
});

type Schema = z.infer<typeof schema>;

export default function Home() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      phone: "",
      username: "",
      message: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (data: Schema) => {
    try {
      const formattedDate = new Date().toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const result = await emailjs.send(
        "service_yzphn4f",
        "template_1ybhjgg",
        {
          username: data.username,
          email: data.email,
          time: formattedDate,
          phone: data.phone,
          service: data.service,
          message: data.message,
        },
        "DJgmoRqROrN7B07P7"
      );
      toast.success("message sent successfully");
      reset();
    } catch (error) {
      toast.success("Failed to send message. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="bg-black px-4 sm:px-6 md:px-[112px] md:py-0 min-h-screen flex flex-col gap-6 py-6">
      <header className="pt-5 flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-white font-bold text-2xl md:text-3xl">
          Send Email to Adam!
        </h1>
        <Button className="bg-[#FEBC5C] hover:bg-[#FEBC5C] w-50 md:w-auto cursor-pointer text-lg text-black font-bold">
          Back to portofolio
        </Button>
      </header>
      <main className="flex flex-col lg:flex-row gap-6 flex-1 md:-mt-2">
        <div className="w-full lg:w-1/2 rounded-lg flex flex-col gap-4 bg-[#C2B6B6] py-6 px-5">
          <h3 className="text-black font-bold text-xl md:text-2xl">
            Let's start to realize your dream project
          </h3>
          <p className="text-base font-[550]">
            Bring your brilliant ideas to life with us to create a visually
            appealing, professional design that suits your business needs.
          </p>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 mt-2"
            >
              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-none bg-black placeholder:text-[#FFFFFF80] placeholder:font-bold text-white font-semibold text-base md:text-[16px]"
                        placeholder="Your Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-none bg-black placeholder:text-[#FFFFFF80] placeholder:font-bold text-white font-semibold text-base md:text-[16px]"
                        placeholder="Email address"
                        {...field}
                        />
                    </FormControl>
                <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-none bg-black placeholder:text-[#FFFFFF80] placeholder:font-bold text-white font-semibold text-base md:text-[16px]"
                        placeholder="Phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full border-none [&>span]:text-base md:[&>span]:text-md bg-black font-bold text-white">
                        <SelectValue
                          className="text-[#FFFFFF80]"
                          placeholder="Select a service"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Services</SelectLabel>
                          <SelectItem value="graphic-design">
                            Graphic Design
                          </SelectItem>
                          <SelectItem value="mockup">Mockup</SelectItem>
                          <SelectItem value="ui-design">UI Design</SelectItem>
                          <SelectItem value="video-editing">
                            Video Editing
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="border-none resize-none h-32 md:h-22 bg-black placeholder:text-[#FFFFFF80] placeholder:font-bold text-white font-semibold text-base md:text-[20px]"
                        placeholder="Type your message here..."
                        {...field}
                        />
                    </FormControl>
                        <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                className="bg-[#FEBC5C] hover:bg-[#FEBC5C] w-full md:w-40 cursor-pointer text-black rounded-full font-bold"
              >
                {isSubmitting ? "Sending" : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col md:flex-row lg:flex-col items-center justify-center gap-6">
          <div className="flex-shrink-0">
            <Image
              quality={100}
              className="rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52"
              width={220}
              height={220}
              src="/photo.jpg"
              alt="photo"
            />
          </div>
          <div className="flex flex-col text-center md:text-left lg:text-center">
            <h2 className="text-white font-bold text-xl md:text-2xl">
              Adam Muhammad Ibrahim Musa
            </h2>
            <p className="text-white">Creative Industries Enthusiast</p>
          </div>
        </div>
      </main>
    </div>
  );
}
