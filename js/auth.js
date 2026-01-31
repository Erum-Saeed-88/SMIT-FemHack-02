import { auth, onAuthStateChanged, getDoc, doc, db } from "../firebase.config.js";


onAuthStateChanged(auth, async (user) => {

  if (user) {
    const uid = user?.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const userData = docSnap.data();

      localStorage.setItem("role", userData?.role);

      ////////// settings
      let profTitle = document.getElementById("prof-title");
      let adminTab = document.getElementById("admin-tab");



      if (profTitle) profTitle.innerText = `${userData?.role} Profile`
      if (adminTab && userData?.role !== "admin")adminTab.style.display = "none";
    }
  }
});