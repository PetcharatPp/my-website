export default function food()
{

  return (
    <section className="bg-white text-gray-900 rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-center">SixPack — แอปช่วยออกกำลังกายให้มีซิกซ์แพ็ก</h2>
      <p className="text-sm md:text-base text-gray-700 mb-4 text-center">เปลี่ยนท้องไม่แบน เป็นซิกซ์แพ็ก — ทีละนาที ทีละท่า</p>

      <p className="mb-3">
        <strong>คำอธิบายสั้น:</strong> SixPack เป็นแอปออกกำลังกายสำหรับคนที่ต้องการหน้าท้องฟิตและมีซิกซ์แพ็กจริงจัง โดยรวมโปรแกรมฝึกท่าทางเฉพาะ ท่า HIIT และแผนโภชนาการแบบเรียบง่าย เหมาะกับทั้งมือใหม่และผู้ที่มีพื้นฐาน ต้องการผลจริงในเวลาที่สั้นและต่อเนื่อง
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <h3 className="font-semibold mb-1">คุณสมบัติเด่น</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>โปรแกรมฝึกเฉพาะทาง (Core Program) — จากเบสิคถึงขั้นสูง</li>
            <li>ตารางฝึกอัตโนมัติ ตามเป้าหมายของคุณ</li>
            <li>ตัวจับเวลา + โหมดวงจร (Interval / Tabata)</li>
            <li>วิดีโอสาธิตสั้น ๆ และคำแนะนำฟอร์ม</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-1">ข้อดีที่ผู้ใช้จะได้รับ</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>โปรแกรมสั้น เหมาะกับชีวิตยุ่ง — 5–20 นาที/วัน</li>
            <li>ลดความเสี่ยงการฝึกผิดท่าด้วยวิดีโอแนะนำ</li>
            <li>มีแผนโภชนาการพื้นฐานช่วยให้เห็นผลเร็วขึ้น</li>
          </ul>
        </div>
      </div>

      <p className="mt-4 text-gray-600">
        <strong>เริ่มใช้งาน:</strong> ตั้งเป้าหมายและระดับของคุณ แอปจะสร้างแผนฝึกและตารางให้ พร้อมจับเวลาฝึกและบันทึกความคืบหน้า
      </p>
    </section>
  );
}