Create a Multistep Form with aleast three steps viz. personal info, address, company info with 
personal info having fields (
  "first_name",  "last_name",  
  "gender", "birth_date",    
  "email",
  "extension_1",  "phone_1",
  "extension_2",  "phone_2",
  "profile_picture"
  ) when I click on next the next section should populate which is address
  address Info  with fields (
  "address",
  "city",  "state",
  "country",  "postal"
)
and finally when clicked on next
   company Info with fields should be shown (
    "company_name"
  "invoice_isolation",
  "invoice_id",
  "gst",  "pan",
  "hsn",
  "discount_percentage",
  "tds_percentage",
  "cgst_percentage",  "sgst_percentage"
) for invoice_isolation add a i when hovered should show text "Client can have same invoice number"

use shadcn for ui, react hook form and zod for validate and form submit 