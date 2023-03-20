import { useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";

const NoEmailSchema = z.object({
  name: z.string().min(2),
  sendEmail: z.literal(false),
});

const EmailSchema = z.object({
  name: z.string(),
  sendEmail: z.literal(true),
  email: z.string().email(),
});

const FormSchema = z.discriminatedUnion("sendEmail", [
  NoEmailSchema,
  EmailSchema,
]);

type FormType = z.infer<typeof FormSchema>;

function App() {
  const [formData, setFormData] = useState<FormType>();
  const { register, handleSubmit, watch } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  const isToShowEmail = watch("sendEmail");

  const onSubmit: SubmitHandler<FormType> = (data) => {
    setFormData(data);
  };

  console.log("renderizei");

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" {...register("name")} />
        </fieldset>
        <fieldset>
          <input type="checkbox" id="sendEmail" {...register("sendEmail")} />
          <label htmlFor="sendEmail">Enviar e-mail</label>
        </fieldset>
        {isToShowEmail && (
          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { shouldUnregister: true })}
            />
          </fieldset>
        )}
        <button type="submit">Enviar</button>
      </form>
      {formData && (
        <pre className="Display">{JSON.stringify(formData, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
