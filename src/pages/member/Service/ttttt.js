import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Information from './information'
import FamilyHistoryForm from './FamilyHistoryForm'
import Education from './EducationForm'
import LanguageAbility from './LanguageAbility'
import SpecialAbility from './SpecialAbility'

const generatePDF = async () => {
  // สร้างไฟล์ PDF
  const pdf = new jsPDF()

  // สร้างหน้าแรก
  const page1 = document.getElementById('page-1')
  const canvas1 = await html2canvas(page1, { scale: 2, logging: false }) // ปรับ scale ตามต้องการ
  const imgData1 = canvas1.toDataURL('image/jpeg', 0.7) // ลดคุณภาพรูปภาพด้วยการกำหนดค่า quality

  const imgWidth = 200
  const imgHeight = (canvas1.height * imgWidth) / canvas1.width
  pdf.addImage(imgData1, 'JPEG', 5, 5, imgWidth, imgHeight)

  pdf.addPage()

  // สร้างหน้าที่สอง
  const page2 = document.getElementById('page-2')
  const canvas2 = await html2canvas(page2, { scale: 2, logging: false }) // ปรับ scale ตามต้องการ
  const imgData2 = canvas2.toDataURL('image/jpeg', 0.7) // ลดคุณภาพรูปภาพด้วยการกำหนดค่า quality

  pdf.addImage(imgData2, 'JPEG', 5, 5, imgWidth, imgHeight)

  pdf.addPage()

  // สร้างหน้าที่สอง
  const page3 = document.getElementById('page-3')
  const canvas3 = await html2canvas(page3, { scale: 2, logging: false }) // ปรับ scale ตามต้องการ
  const imgData3 = canvas3.toDataURL('image/jpeg', 0.7) // ลดคุณภาพรูปภาพด้วยการกำหนดค่า quality

  pdf.addImage(imgData3, 'JPEG', 5, 5, imgWidth, imgHeight)

  pdf.addPage()

  // สร้างหน้าที่สอง
  const page4 = document.getElementById('page-4')
  const canvas4 = await html2canvas(page4, { scale: 2, logging: false }) // ปรับ scale ตามต้องการ
  const imgData4 = canvas4.toDataURL('image/jpeg', 0.7) // ลดคุณภาพรูปภาพด้วยการกำหนดค่า quality

  pdf.addImage(imgData4, 'JPEG', 5, 5, imgWidth, imgHeight)

  pdf.addPage()

  // สร้างหน้าที่สอง
  const page5 = document.getElementById('page-5')
  const canvas5 = await html2canvas(page5, { scale: 2, logging: false }) // ปรับ scale ตามต้องการ
  const imgData5 = canvas5.toDataURL('image/jpeg', 0.7) // ลดคุณภาพรูปภาพด้วยการกำหนดค่า quality

  pdf.addImage(imgData5, 'JPEG', 5, 5, imgWidth, imgHeight)

  // ดาวน์โหลดไฟล์ PDF
  pdf.save('multi_page.pdf')
}

export default function MyComponent() {
  const handleDownloadClick = () => {
    generatePDF()
  }

  return (
    <div>
      <div id='page-1'>
        <Information />
      </div>
      <div id='page-2'>
        <FamilyHistoryForm />
      </div>
      <div id='page-3'>
        <Education />
      </div>
      <div id='page-4'>
        <LanguageAbility />
      </div>
      <div id='page-5'>
        <SpecialAbility />
      </div>
      <button onClick={handleDownloadClick}>ดาวน์โหลด PDF</button>
    </div>
  )
}
