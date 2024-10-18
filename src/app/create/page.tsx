"use client"
import { Button } from '@/components/ui/button';
import React from 'react'
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  prompt: z
    .string()
    .min(7, { message: "Prompt must be atleast 7 characters long!" }),
});


export default function page() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="w-full p-3 min-h-dvh h-full flex justify-start items-center pt-[72px] flex-col">
      <div className="w-full p-3">
        <h1 className="text-center font-bold text-white text-4xl">Create</h1>
        <p className="text-white/60 text-center">
          Generate Stunning Images from Text for FREE
        </p>
      </div>
      <div className="flex w-full gap-3 h-[calc(100dvh-200px)] md:flex-row flex-col">

        <div className="__form flex-[2] h-full gap-2 flex justify-center items-start flex-col">
          <p className="text-center w-full lg:text-left text-sm text-white/80">
            Type you prompt below to create any image you can imagine!
          </p>
          <div className="flex gap-2 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex gap-2"
              >
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="w-full max-w-full lg:max-w-[70%]">
                      <FormControl>
                        <Input
                          placeholder="a cat sitting over a sofa..."
                          className="w-full transition-all border-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  Generate
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className='__output flex-[1] bg-white/5 rounded-lg '></div>

      </div>
    </div>
  );
}