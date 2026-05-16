const ukuranData = {

  Banner: {
    "60x160 cm": 35000,
    "80x180 cm": 50000,
    "100x200 cm": 75000
  },

  Poster: {
    "A4 (21x29.7 cm)": 10000,
    "A3 (29.7x42 cm)": 20000,
    "A2 (42x59.4 cm)": 35000
  },

  "Kartu Nama": {
    "9x5.5 cm (100 pcs)": 25000,
    "9x5.5 cm (200 pcs)": 45000
  },

  "Stiker/Brosur": {
    "A5 (14.8x21 cm)": 15000,
    "A4 (21x29.7 cm)": 25000,
    "A3 (29.7x42 cm)": 45000
  }

};

const layanan =
document.getElementById("layanan");

const ukuran =
document.getElementById("ukuran");

const jumlah =
document.getElementById("jumlah");

const harga =
document.getElementById("harga");

let totalHarga = 0;

layanan.addEventListener("change", function(){

  ukuran.innerHTML =
  '<option value="">Pilih Ukuran</option>';

  const selected = layanan.value;

  for(let item in ukuranData[selected]){

    ukuran.innerHTML += `
      <option value="${item}">
        ${item}
      </option>
    `;

  }

  updateHarga();

});

ukuran.addEventListener("change", updateHarga);

jumlah.addEventListener("input", updateHarga);

function updateHarga(){

  const layananValue = layanan.value;
  const ukuranValue = ukuran.value;
  const jumlahValue = jumlah.value || 1;

  if(
    layananValue &&
    ukuranValue
  ){

    const hargaSatuan =
    ukuranData[layananValue][ukuranValue];

    totalHarga =
    hargaSatuan * jumlahValue;

    harga.innerText =
    "Rp" +
    totalHarga.toLocaleString("id-ID");

  }

}

document
.getElementById("orderForm")
.addEventListener("submit",
async function(e){

e.preventDefault();

const kodePesanan =
"PKY" + Date.now();

const data = {

  kodePesanan: kodePesanan,

  nama:
  document.getElementById("nama").value,

  kontak:
  document.getElementById("kontak").value,

  layanan:
  layanan.value,

  ukuran:
  ukuran.value,

  jumlah:
  jumlah.value,

  harga:
  totalHarga,

  detail:
  document.getElementById("detail").value,

  waktu:
  new Date().toLocaleString("id-ID"),

  status:
  "Belum Dibayar"

};

const url =
"https://script.google.com/macros/s/AKfycbyDrUCxwpf4HysvbSvH8DqFW_UgGFbnK3lX-z_pXRWS0-weWjTPJQprkmlKg-xpWvo5yA/exec";

fetch(url,{

  method:"POST",

  body:JSON.stringify(data)

})
.then(res=>res.text())
.then(response=>{

  document
  .getElementById("popupKode")
  .innerText = kodePesanan;

  document
  .getElementById("popup")
  .style.display = "flex";

  document
  .getElementById("orderForm")
  .reset();

  harga.innerText = "Rp0";

});

});

function closePopup(){

  document
  .getElementById("popup")
  .style.display = "none";

}

function cekPesanan(){

const kode =
document
.getElementById("cekKode")
.value;

const url =
"https://script.google.com/macros/s/AKfycbyDrUCxwpf4HysvbSvH8DqFW_UgGFbnK3lX-z_pXRWS0-weWjTPJQprkmlKg-xpWvo5yA/exec"
+ "?kode="
+ encodeURIComponent(kode);

fetch(url)
.then(res=>res.json())
.then(data=>{

  if(data.found){

    document
    .getElementById("hasilCek")
    .innerHTML = `

      <h3>Detail Pesanan</h3>

      <p>
      <b>Kode:</b>
      ${data.kode}
      </p>

      <p>
      <b>Nama:</b>
      ${data.nama}
      </p>

      <p>
      <b>Layanan:</b>
      ${data.layanan}
      </p>

      <p>
      <b>Ukuran:</b>
      ${data.ukuran}
      </p>

      <p>
      <b>Jumlah:</b>
      ${data.jumlah}
      </p>

      <p>
      <b>Harga:</b>
      Rp${Number(data.harga)
        .toLocaleString("id-ID")}
      </p>

      <p>
      <b>Status:</b>
      ${data.status}
      </p>

    `;

  }else{

    document
    .getElementById("hasilCek")
    .innerHTML =
    "Pesanan tidak ditemukan";

  }

});

}
function copyKode(){

  const kode =
  document
  .getElementById("popupKode")
  .innerText;

  navigator.clipboard
  .writeText(kode);

}

const menuBtn =
document.getElementById("menuBtn");

const sidebar =
document.getElementById("sidebar");

const overlay =
document.getElementById("overlay");

menuBtn.addEventListener("click", ()=>{

  sidebar.classList.add("active");

  overlay.classList.add("active");

});

overlay.addEventListener("click", closeSidebar);

document
.querySelectorAll(".menu-link")
.forEach(link=>{

  link.addEventListener("click", ()=>{

    closeSidebar();

  });

});

function closeSidebar(){

  sidebar.classList.remove("active");

  overlay.classList.remove("active");

}