let sinhVien = JSON.parse(localStorage.getItem("sinhVien")) || []
const name = document.getElementById('name')
const mark = document.getElementById("mark")
const addBtn = document.getElementById("add")
const tablebd = document.getElementById("tablebd")
const thongke = document.getElementById("thongke")

const getRank = (mark) => {
    if (mark >= 8.5) return " Giỏi"
    if (mark >= 7.0) return " Khá"
    if (mark >= 5) return " Trung bình"
    return "Yếu"
}
const renderTable = () => {
    tablebd.innerHTML = ""
    let tong = 0
    sinhVien.forEach((sv, index) => {
        tong += sv.mark
        const rank = getRank(sv.mark)
        const tr = document.createElement("tr")
        if (sv.mark < 5) {
            tr.classList.add("low-mark")
        }

        tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${sv.name}</td>
        <td>${sv.mark}</td>
        <td>${rank}</td>
        <td> 
            <button data-index="${index}">
            Xóa
            </button>
        </td>
        `
        tablebd.appendChild(tr)
    })
    const tb = sinhVien.length ? (tong / sinhVien.length) : 0
    thongke.innerHTML = ` 
    Tổng sinh viên: ${sinhVien.length}
    <br>
    Điểm trung bình: ${tb}
    `
}

const addSV = () => {
    const n = name.value.trim()
    const m = Number(mark.value)
    if (n === "") {
        alert("Họ tên không được để trống")
        return
    }
    if (isNaN(m) || m < 0 || m > 10) {
        alert("0<= điểm<=10")
        return
    }
    sinhVien.push({
        name: n,
        mark: m
    })
    localStorage.setItem("sinhVien", JSON.stringify(sinhVien))
    renderTable()
    name.value = ""
    mark.value = ""
    name.focus()
}
tablebd.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const index = e.target.dataset.index
        sinhVien.splice(index, 1)
        localStorage.setItem("sinhVien", JSON.stringify(sinhVien))
        renderTable()
    }
})
addBtn.addEventListener("click", addSV)
mark.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        addSV()
    }
})
renderTable()