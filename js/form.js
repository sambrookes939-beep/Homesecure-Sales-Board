import { db } from "./firebase-init.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
document.getElementById("saleForm").addEventListener("submit", async e=>{
 e.preventDefault();
 const agent=document.getElementById("agent").value;
 const upfront=parseFloat(document.getElementById("upfront").value);
 const monitoring=parseFloat(document.getElementById("monitoring").value);
 const notes=document.getElementById("notes").value;
 await addDoc(collection(db,"sales"),{
   agent, upfront, monitoring, notes, created: serverTimestamp()
 });
 document.getElementById("status").textContent="Saved!";
});