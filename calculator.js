// calculator.js
(function () {
    const rumus = 34.59445711;
    const waktu = 2.44307;
    const sukses = -0.125;
    const orang = 0.2833;
    const cost = 1800000;
    var maeSkenario = 528.667
    var maeSprint = 6.866
    var maeSukses = 93.33
    var maePeople = 6.033333333
    var maeCost = 60.33

  
    const calculateBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");
    const skenarioInput = document.getElementById("skenario");
    const resultsDiv = document.getElementById("results");
    const errorMessagesDiv = document.getElementById("errorMessages");
    const skenarioLowDiv = document.getElementById("skenarioLow");
  
    calculateBtn.addEventListener("click", calculate);
    resetBtn.addEventListener("click", resetForm);
  
    function calculate() {
      const skenario = parseInt(skenarioInput.value);
      errorMessagesDiv.textContent = "";
  
      if (isNaN(skenario)) {
        showError("Skenario tidak boleh kosong!");
        clearResults();
      } else if (skenario >= 10000) {
        showError("Skenario terlalu banyak untuk sebuah fitur atau projek, coba dibagi kedalam beberapa fitur!");
        clearResults();
      } else if (skenario <= 150) {
        showError("Skenario terlalu sedikit untuk dilakukan proses scrum!");
        clearResults();
      } else {
        calculateResults(skenario);
      }
    }
  
    function calculateResults(skenario) {
      const pembanding = skenario / rumus;
      const waktuDibutuhkan = calculateWaktu(pembanding);
      const orangDibutuhkan = countOrang(orang, pembanding);
      const persentaseSukses = countSukses(sukses, pembanding);
  
      displayResults(skenario, waktuDibutuhkan, orangDibutuhkan, persentaseSukses);
    }
  
    function calculateWaktu(pembanding) {
      return Math.ceil((waktu * pembanding) / 7);
    }
  
    function countOrang(orang, pembanding) {
      const hitung = Math.ceil(orang * pembanding);
      return Math.min(hitung, 4);
    }
  
    function countSukses(sukses, pembanding) {
      const persentase = sukses * pembanding;
      const angkaSukses = 100 + persentase;
      return angkaSukses >= 85 ? `${angkaSukses}%` : "Dibawah 85%";
    }
  
    function countCost(cost, pembanding, totalOrang) {
      return formatAngka(Math.floor(cost * pembanding * totalOrang));
    }
  
    function hitungmae () {
        var skenarioHitung = skenario / maeSkenario
        var sprintHitung = (skenarioHitung * maeSprint) - maeSprint
        var suksesHitung = (skenarioHitung * maeSukses) - maeSukses
        var peopleHitung = (skenarioHitung * maePeople) - maePeople
        var costHitung = (skenarioHitung * maeCost) - maeCost

        var hasil = (sprintHitung + suksesHitung + peopleHitung + costHitung) / 4
        return Math.abs(hasil)
    }
    
    function displayResults(skenario, waktuDibutuhkan, orangDibutuhkan, persentaseSukses) {
      resultsDiv.innerHTML = `
        <h1>Summary</h1>
        <p>Skenario: ${skenario} skenario</p>
        <p>Waktu yang dibutuhkan: ${waktuDibutuhkan} Sprint</p>
        <p>Orang yang dibutuhkan: ${orangDibutuhkan}</p>
        <p>Persentase sukses scrum: ${persentaseSukses}</p>


        =============================================================================== <br>

        <h6>Hasil scrum untuk ${skenario} skenario adalah seperti hasil diatas.</h6>
				Penjelasan-nya adalah sebagai berikut : <br> <br>
				1. Satuan Sprint dijelaskan dalam satuan kurung waktu 1 minggu atau 5 hari kerja. Dalam arti misalkan 3 sprint adalah 15 HK (Hari Kerja). <br>
				2. Orang yang dibutuhkan ini sebenarnya bisa bersifat relatif, tetapi hasil ini bisa menjadi patokan untuk gambaran kasar kebutuhan SDM. <br>
				3. Persentase sukses ini dihasilkan tanpa ada gangguan lain. Contoh gangguan bisa berupa kelalaian manusia itu sendiri. <br>
				4. Cost ini bersifat tentatif atau bisa berubah. Ini merupakan data menggunakan gaji staff IT rata rata. <br>
				5. Data ini mempunyai error data ${hitungmae()} % <br> <br>
					<h3> <b>Skala	Keterangan <br> </b> </h3> <br>
					<ul>
						<li>1-30%	Tingkat error rendah</li>
						<li>31-50%	Tingkat error normal</li>
						<li>51-60%	Tingkat error diatas rata-rata</li>
						<li>61-80%	Tingkat error tinggi</li>
						<li>81-100%	Data kurang valid</li>
					</ul>
					<br><br><br><br>
      `;
    }
  
    function showError(message) {
      errorMessagesDiv.textContent = message;
    }
  
    function clearResults() {
      resultsDiv.innerHTML = "";
    }
  
    function resetForm() {
      skenarioInput.value = "";
      errorMessagesDiv.textContent = "";
      clearResults();
    }
  
    function formatAngka(number) {
      const number_string = number.toString();
      const sisa = number_string.length % 3;
      const rupiah = number_string.substr(0, sisa);
      const ribuan = number_string.substr(sisa).match(/\d{3}/g);
  
      if (ribuan) {
        return rupiah + (sisa ? "." : "") + ribuan.join(".");
      }
  
      return rupiah;
    }
  })();
  