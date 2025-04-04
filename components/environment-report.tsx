import { FileText } from "lucide-react"

export function EnvironmentReport() {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl mr-4">
          JAN
        </div>
        <div className="text-blue-600 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-500" />
          <div>
            <p className="text-lg font-medium">รายงานด้านสิ่งแวดล้อมบริษัท Gosoft</p>
            <p className="text-lg font-medium">ประจำเดือน มกราคม 2568</p>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl mr-4">
          FEB
        </div>
        <div className="text-blue-600 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-500" />
          <div>
            <p className="text-lg font-medium">รายงานด้านสิ่งแวดล้อมบริษัท Gosoft</p>
            <p className="text-lg font-medium">ประจำเดือน กุมภาพันธ์ 2568</p>
          </div>
        </div>
      </div>
    </div>
  )
}

