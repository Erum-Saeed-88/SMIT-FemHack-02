import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  database,
  set,
  ref,
  setDoc,
  doc,
  db,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  query,
  getDocs,
  collection,
} from "./firebase.config.js";

////////////////// SignUp

const signUp = async (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let contact = document.getElementById("contact").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("pswd").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name,
      age,
      contact,
      email,
      isActive: true,
      timestamp: serverTimestamp(),
      role: "user",
    });



    if (!user.emailVerified) {
      await sendEmailVerification(auth.currentUser);
      signOut(auth);
      alert("Please verify your email")
      window.location.replace("/html/login.html");
    }
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("signup-form")?.addEventListener("submit", signUp);

////////////////// SignIn

const login = async () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pswd").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log(userCredential.user);
    if (!auth.currentUser.emailVerified) {
      console.log(auth.currentUser);

      await sendEmailVerification(auth.currentUser);
      console.log("email sent successfully");
    } else {
      window.location.replace("/");
    }
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("btn2")?.addEventListener("click", login);

/////////////////////  forget Password

const forgetPassword = async () => {
  try {
    const email = document.getElementById("email").value;
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
  }
};

document
  .getElementById("forget-paswd")
  ?.addEventListener("click", forgetPassword);



///////////////////////////////  Logout

document.getElementById("logout-btn")?.addEventListener("click", () => {
  signOut(auth);
  localStorage.removeItem("role");
});

//////////////////////////// SignIn with Google

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // console.log(">>>>>>>> ",result.user);
    window.location.replace("/");
  } catch (error) {
    console.log(error);
  }
};

document
  .getElementById("google-btn")
  ?.addEventListener("click", signInWithGoogle);


////////////////////////////// Update



const inputs = document.querySelectorAll(".update");

inputs.forEach((input) => {

  input.addEventListener("blur", async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      [input.name]: input.value,
    });
  })

})


const ids = ['name', 'email', 'phone', 'cnic', 'address', 'nationality', 'education', 'experience', 'skill'];

const elements = ids.map(id => document.getElementById(id));

elements.forEach((element, index) => {
    if (!element) {
        console.error(`Element with ID '${ids[index]}' not found.`);
    }
});

const form = document.getElementById('resumeform');
const resumeDisplayElement = document.getElementById('resumeOutput');

if (!form || !resumeDisplayElement) {
    console.error('Form or resume display element is missing.');
} else {
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload

        // Getting input values safely
        const fileInput = document.getElementById('profilePicture');
        let profilePictureURL = '';

        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const cnic = document.getElementById('cnic')?.value || '';
        const address = document.getElementById('address')?.value || '';
        const nationality = document.getElementById('nationality')?.value || '';
        const education = document.getElementById('education')?.value || '';
        const experience = document.getElementById('experience')?.value || '';
        const skills = document.getElementById('skill')?.value || ''; // Note: ID is 'skill' as per your code

        // Handle profile picture
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const profilePictureFile = fileInput.files[0];
            profilePictureURL = URL.createObjectURL(profilePictureFile);
            console.log('Profile picture URL:', profilePictureURL);
        } else {
            console.log('No profile picture selected.');
        }

        // Generate image HTML
        const imageHTML = profilePictureURL
            ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture" style="max-width: 150px; height: auto;">`
            : '';

        console.log('Generated image HTML:', imageHTML);

        // Delete resume
        function deleteResume(index) {
            resumes.splice(index, 1);
            localStorage.setItem('resumes', JSON.stringify(resumes));
            renderResumes();
        }

        // Create resume output
        const resumeHTML = `
            <h2>RESUME</h2>
            <br>
            ${imageHTML}  <!-- Insert the profile picture here -->
            <h3>Personal Information</h3> 
            <p><strong>Name:</strong><span contenteditable="true"> ${name} </span></p>
            <p><strong>Email:</strong><span contenteditable="true"> ${email} </span></p>
            <p><strong>Number:</strong><span contenteditable="true"> ${phone} </span></p>
            <p><strong>CNIC:</strong><span contenteditable="true"> ${cnic} </span></p>
            <p><strong>Address:</strong><span contenteditable="true"> ${address} </span></p>
            <p><strong>Nationality:</strong><span contenteditable="true"> ${nationality} </span></p>
            
            <h3>Education:</h3>
            <p contenteditable="true">${education}</p>

            <h3>Experience:</h3>
            <p contenteditable="true">${experience}</p>
            
            <h3>Skills:</h3>
            <p contenteditable="true">${skills}</p>
            
        `;

        console.log('Generated resume HTML:', resumeHTML);

        // Display the resume
        resumeDisplayElement.innerHTML = resumeHTML;
    });
}


///////////////////////// profile image


/*const uploadImage = async () => {
  const file = document.getElementById("image");
  const selectedImg = file.files[0];
  const cloudName = "da9vibnc0";
  const presetName = "";

  const formData = new FormData();
  formData.append("file", selectedImg);
  formData.append("cloud_name", cloudName);
  formData.append("upload_preset", presetName);


  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });


    const data = await response.json();

    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      profImage: data?.secure_url,
      imageId: data?.public_id
    });

    const image = document.getElementById("profile-img")
    if (image) image.src = data?.secure_url;

  } catch (error) {
    console.log(error);

  }

}

const uploadBtn = document.getElementById("upload");
if (uploadBtn) addEventListener("click", uploadImage)*/




/////////////////////////// Get All Products (Home page)

/*let homeProducts = document.getElementById("home-products");

const getAllProducts = async () => {
  try {
    const ProductsRef = query(collection(db, "products"));

    const querySnapshot = await getDocs(ProductsRef);
    querySnapshot.forEach((doc) => {

      // console.log(doc.id, " => ", doc.data());
      const product = doc.data();
      homeProducts.innerHTML += `
 <div class="card" style="width: 18rem;">
      <img src="${product.image.image}"
        class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text">${product.price}</p>
        <a href="#" class="btn btn-danger"  >view Details</a>
      </div>
    </div>
`

    });


  } catch (error) {
    console.log(error);

  }
}

if (homeProducts) getAllProducts();*/