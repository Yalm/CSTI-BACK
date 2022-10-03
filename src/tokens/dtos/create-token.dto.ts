import { InferType, object, string } from "yup";

const MAX_YEARS = 5;

const createTokenSchema = object({
  card_number: string().required(),
  cvv: string().required(),
  expiration_month: string().required(),
  expiration_year: string()
    .required()
    .test(
      "max_year",
      "expiration_year must not be older than 5 years",
      (value) => {
        const year = new Date().getFullYear() + MAX_YEARS;
        return +value <= year;
      }
    ),
  email: string()
    .email()
    .matches(/^[\w-]+(\.[\w-]+)*@(gmail.com|hotmail.com|yahoo.es)$/i)
    .required(),
});

type CreateTokenDto = InferType<typeof createTokenSchema>;

export { createTokenSchema, CreateTokenDto, MAX_YEARS };
