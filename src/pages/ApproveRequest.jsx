import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Calendar, 
  ArrowLeft,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ApproveRequest() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState("");
  const [meetingDetails, setMeetingDetails] = useState({
    clientName: "יוסי כהן",
    company: "חברת אבגד בע\"מ",
    date: "26/06/2023",
    time: "13:30",
    type: "zoom"
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile?.type !== 'application/pdf') {
      setError("יש להעלות קובץ PDF בלבד");
      setFile(null);
      return;
    }
    
    if (selectedFile?.size > 10 * 1024 * 1024) { // 10MB
      setError("גודל הקובץ חורג מ-10MB המותרים");
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    setError("");
  };

  const handleUpload = () => {
    if (!file) {
      setError("יש לבחור קובץ");
      return;
    }
    
    setIsUploading(true);
    
    // סימולציה של העלאת קובץ
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
      // כאן בפרויקט אמיתי תשמור את הקובץ בשרת/DB
    }, 2000);
  };

  const handleApprove = () => {
    alert("הפגישה אושרה והצעת המחיר נשלחה ללקוח!");
    // כאן בפרויקט אמיתי תעדכן את סטטוס הפגישה ל"מאושר"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link to={createPageUrl("Admin")}>
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">אישור פגישה והעלאת הצעת מחיר</h1>
              <p className="text-gray-500">העלה הצעת מחיר מסודרת לאישור הפגישה</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* פרטי הפגישה */}
            <Card>
              <CardHeader>
                <CardTitle>פרטי הפגישה</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">שם הלקוח</p>
                    <p className="font-medium">{meetingDetails.clientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">חברה</p>
                    <p className="font-medium">{meetingDetails.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">תאריך</p>
                    <p className="font-medium">{meetingDetails.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">שעה</p>
                    <p className="font-medium">{meetingDetails.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">סוג פגישה</p>
                    <Badge className="mt-1">
                      {meetingDetails.type === 'zoom' ? 'פגישת זום' : 'פגישה פרונטלית'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* העלאת הצעת מחיר */}
            <Card>
              <CardHeader>
                <CardTitle>העלאת הצעת מחיר</CardTitle>
              </CardHeader>
              <CardContent>
                {!isUploaded ? (
                  <>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="file"
                        id="file-upload"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Upload className="h-6 w-6 text-gray-500" />
                        </div>
                        <p className="text-[#233071] mb-1 font-medium">
                          {file ? file.name : 'לחץ להעלאת הצעת מחיר'}
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF בלבד, עד 10MB
                        </p>
                      </label>
                    </div>

                    {error && (
                      <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center mb-4">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {error}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        onClick={handleUpload}
                        disabled={!file || isUploading}
                        className="bg-blue-600 hover:bg-blue-700 w-full"
                      >
                        {isUploading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                            מעלה...
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4 ml-2" />
                            העלאת הצעת מחיר
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-6 text-center bg-green-50 rounded-lg mb-4">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                      <h3 className="text-lg font-medium text-green-800">ההצעה הועלתה בהצלחה!</h3>
                      <p className="text-green-600">{file?.name}</p>
                    </div>

                    <Button
                      onClick={handleApprove}
                      className="bg-green-600 hover:bg-green-700 w-full"
                    >
                      <Calendar className="h-4 w-4 ml-2" />
                      אשר את הפגישה ושלח הצעת מחיר
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}