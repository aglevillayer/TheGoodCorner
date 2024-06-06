import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import styles from "./new.module.css";

const BACKEND_URL = "http://localhost:4000";
type category = {
  id: number;
  name: string;
};
type Inputs = {
  title: string;
  price: number;
  location: string;
  description: string;
  category: string;
};

export default function NewAd() {
  const [categories, setCategories] = useState<category[]>([]);
  useEffect(() => {
    async function fetchCategories(): Promise<category[]> {
      try {
        const result = await axios.get<category[]>(BACKEND_URL + "/category");
        console.log(result);
        setCategories(result.data);
      } catch (err) {
        console.error(
          err,
          "cannot fetch categories - falling back to empty array"
        );
      }
    }
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  function onSubmit(data): SubmitHandler<Inputs> {
    try {
      console.log(data);
      axios.post(BACKEND_URL + "/ad", data);
    } catch (err) {
      console.error(err, "Error on creating a new add");
    }
  }
  console.log(errors);

  return (
    // <form
    //   onSubmit={(e) => { // "e" is an object which has a lot of methods such as preventDefault. It's the event object // C'est un objet react (sur couche) et pas natif JS = permet de s'assurer que quelque soit le navigateur qu'on utilise, e aura les mêmes méthodes
    //     // Prevent the browser from reloading the page
    //     e.preventDefault();

    //     // Read the form data
    //     const form = e.target;
    //     const formData = new FormData(form as HTMLFormElement);

    //     // Or you can work with it as a plain object
    //     const formJson = Object.fromEntries(formData.entries());
    //     console.log(formJson);
    //   }}
    // >
    //   {/*Balise <form> va rerender la page ?*/}
    //   <p> Here we will create a formulaire to add a new ad</p>
    //   <label>
    //     Ad title :<br /> {/*<br/> permet d'aller à la ligne$*/}
    //     <input className="text-field" name="title" />
    //   </label>
    //   <br />
    //   <label>
    //     Price :<br />
    //     <input className="text-field" name="price" />
    //   </label>
    //   <br />
    //   <label>
    //     Location :<br /> {/*<br/> permet d'aller à la ligne$*/}
    //     <input className="text-field" name="location" />
    //   </label>
    //   <br />
    //   <label>
    //     Description :<br /> {/* <br/> permet d'aller à la ligne */}
    //     <input className="text-field" name="description" />
    //   </label>
    //   <br />

    //   <label>Category :</label>
    //   <br />
    //   <select name="category">
    //     {categories.map((el) => (
    //       <option value={el.id} key={el.id}>
    //         {el.name}
    //       </option>
    //     ))}
    //   </select>

    //   <button className="button">Submit</button>
    // </form>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.formInput}
        placeholder="Title"
        {...register("title", { required: true, maxLength: 80 })}
      />
      <input
        className={styles.formInput}
        placeholder="Description"
        {...register("description")}
      />
      <input
        className={styles.formInput}
        placeholder="Price"
        {...register("price", { required: true, maxLength: 80 })}
      />
      <input
        className={styles.formInput}
        placeholder="Location"
        {...register("location", { required: true, maxLength: 80 })}
      />
      <select className={styles.formInput} {...register("category")}>
        <option selected disabled>
          Select Category
        </option>
        {categories.map((el) => (
          <option value={el.name} key={el.id}>
            {el.name}
          </option>
        ))}
      </select>

      <input className={styles.formSubmit} type="submit" />
    </form>
  );
}
