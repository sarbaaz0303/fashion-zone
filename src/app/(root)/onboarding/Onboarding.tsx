'use client'
import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Tooltip, Input, Select, FormField, FormControl, FormItem, Label } from '@/components/ui';

// Define the schemas for each step
const personalInfoSchema = z.object({
  first_name: z.string().nonempty({ message: "First name is required" }),
  last_name: z.string().nonempty({ message: "Last name is required" }),
  gender: z.string().optional(),
  birth_date: z.date().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  extension_1: z.string().optional(),
  phone_1: z.string().optional(),
  extension_2: z.string().optional(),
  phone_2: z.string().optional(),
  profile_picture: z.string().url().optional(),
});

const addressInfoSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postal: z.string().optional(),
});

const companyInfoSchema = z.object({
  company_name: z.string().optional(),
  invoice_isolation: z.boolean().optional(),
  invoice_id: z.string().optional(),
  gst: z.string().optional(),
  pan: z.string().optional(),
  hsn: z.string().optional(),
  discount_percentage: z.number().optional(),
  tds_percentage: z.number().optional(),
  cgst_percentage: z.number().optional(),
  sgst_percentage: z.number().optional(),
});

// Combine schemas for form validation
const combinedSchema = z.object({
  personalInfo: personalInfoSchema,
  addressInfo: addressInfoSchema,
  companyInfo: companyInfoSchema,
});

const FormStep = ({ children }) => {
  const { handleSubmit } = useFormContext();
  return <form onSubmit={handleSubmit}>{children}</form>;
};

const PersonalInfo = () => (
  <FormStep>
    <FormItem>
      <Label>First Name</Label>
      <FormControl>
        <Input {...register("personalInfo.first_name")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Last Name</Label>
      <FormControl>
        <Input {...register("personalInfo.last_name")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Gender</Label>
      <FormControl>
        <Select {...register("personalInfo.gender")}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Birth Date</Label>
      <FormControl>
        <Input type="date" {...register("personalInfo.birth_date")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Email</Label>
      <FormControl>
        <Input type="email" {...register("personalInfo.email")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Phone 1</Label>
      <FormControl>
        <Input {...register("personalInfo.phone_1")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Extension 1</Label>
      <FormControl>
        <Input {...register("personalInfo.extension_1")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Phone 2</Label>
      <FormControl>
        <Input {...register("personalInfo.phone_2")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Extension 2</Label>
      <FormControl>
        <Input {...register("personalInfo.extension_2")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Profile Picture URL</Label>
      <FormControl>
        <Input {...register("personalInfo.profile_picture")} />
      </FormControl>
    </FormItem>
  </FormStep>
);

const AddressInfo = () => (
  <FormStep>
    <FormItem>
      <Label>Address</Label>
      <FormControl>
        <Input {...register("addressInfo.address")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>City</Label>
      <FormControl>
        <Input {...register("addressInfo.city")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>State</Label>
      <FormControl>
        <Input {...register("addressInfo.state")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Country</Label>
      <FormControl>
        <Input {...register("addressInfo.country")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Postal Code</Label>
      <FormControl>
        <Input type="number" {...register("addressInfo.postal")} />
      </FormControl>
    </FormItem>
  </FormStep>
);

const CompanyInfo = () => (
  <FormStep>
    <FormItem>
      <Label>Company Name</Label>
      <FormControl>
        <Input {...register("companyInfo.company_name")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Invoice Isolation</Label>
      <FormControl>
        <Tooltip content="Client can have same invoice number">
          <Input type="checkbox" {...register("companyInfo.invoice_isolation")} />
        </Tooltip>
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Invoice ID</Label>
      <FormControl>
        <Input {...register("companyInfo.invoice_id")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>GST</Label>
      <FormControl>
        <Input {...register("companyInfo.gst")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>PAN</Label>
      <FormControl>
        <Input {...register("companyInfo.pan")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>HSN</Label>
      <FormControl>
        <Input {...register("companyInfo.hsn")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>Discount Percentage</Label>
      <FormControl>
        <Input type="number" step="0.01" {...register("companyInfo.discount_percentage")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>TDS Percentage</Label>
      <FormControl>
        <Input type="number" step="0.01" {...register("companyInfo.tds_percentage")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>CGST Percentage</Label>
      <FormControl>
        <Input type="number" step="0.01" {...register("companyInfo.cgst_percentage")} />
      </FormControl>
    </FormItem>
    <FormItem>
      <Label>SGST Percentage</Label>
      <FormControl>
        <Input type="number" step="0.01" {...register("companyInfo.sgst_percentage")} />
      </FormControl>
    </FormItem>
  </FormStep>
);

const MultistepForm = () => {
  const [step, setStep] = useState(0);
  const methods = useForm({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      personalInfo: {},
      addressInfo: {},
      companyInfo: {},
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // handle form submission
  };

  return (
    <FormProvider {...methods}>
      <div>
        {step === 0 && <PersonalInfo />}
        {step === 1 && <AddressInfo />}
        {step === 2 && <CompanyInfo />}
        <div>
          {step > 0 && <Button onClick={() => setStep(step - 1)}>Back</Button>}
          {step < 2 && <Button onClick={() => setStep(step + 1)}>Next</Button>}
          {step === 2 && <Button onClick={methods.handleSubmit(onSubmit)}>Submit</Button>}
        </div>
      </div>
    </FormProvider>
  );
};

export default MultistepForm;
