import axios from "axios";
import { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:4000";
type category = {
  id: number;
  name: string;
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

  return (
    <form
      onSubmit={(e) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);

        // Or you can work with it as a plain object
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
      }}
    >
      {/*Balise <form> va rerender la page ?*/}
      <p> Here we will create a formulaire to add a new ad</p>
      <label>
        Ad title :<br /> {/*<br/> permet d'aller à la ligne$*/}
        <input className="text-field" name="title" />
      </label>
      <br />
      <label>
        Price :<br />
        <input className="text-field" name="price" />
      </label>
      <br />
      <label>
        Location :<br /> {/*<br/> permet d'aller à la ligne$*/}
        <input className="text-field" name="location" />
      </label>
      <br />
      <label>
        Description :<br /> {/* <br/> permet d'aller à la ligne */}
        <input className="text-field" name="description" />
      </label>
      <br />

      <label>Category :</label>
      <br />
      <select name="category">
        {categories.map((el) => (
          <option value={el.id} key={el.id}>
            {el.name}
          </option>
        ))}
      </select>

      <button className="button">Submit</button>
    </form>
  );
}
