import React , {useState} from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function reports() {
  const [open, setOpen] = useState(false); 
    const [selectedDate, setSelectedDate] = useState(null);
    // const [data, setData] = useState([]);
    const data  =[
      {
        fsId: '',
        selectedDate: '',
        Date: null,
        CN: "row[1]",
        VNO: "row[2]",
        FT: "row[3]",
        RT: "row[4]",
        QT: "row[5]",
        AMT: "row[6]",
        datePickerOpen: false,
    },
    {
        fsId: '',
        selectedDate: '',
        Date: null,
        CN: "row[1]",
        VNO: "row[2]",
        FT: "row[3]",
        RT: "row[4]",
        QT: "row[5]",
        AMT: "row[6]",
        datePickerOpen: false,
    },
  ]
  return (
     <div className="p-6 font-mono">
      <div className="flex flex-wrap justify-between items-start mb-6">
        {/* Billing Date */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="date" className="px-1">Select Billing Date</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setSelectedDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-start mb-6">
      <div className="grid grid-rows-2 min-w-[20%]">
          <Label htmlFor="fsid">Total Readings</Label>
          <Input readOnly type="text"  />  
      </div>
       <div className="grid grid-rows-2 min-w-[20%]">
          <Label htmlFor="fsid">Opening Reading</Label>
          <Input readOnly value="123" type="text"  />  
      </div>
       <div className="grid grid-rows-2 min-w-[20%]">
          <Label htmlFor="fsid">Total Amount</Label>
          <Input readOnly type="text"  />  
      </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-gray-800 font-semibold">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">CN</th>
              <th className="p-2 border">VNO</th>
              <th className="p-2 border">FT</th>
              <th className="p-2 border">RT</th>
              <th className="p-2 border">QT</th>
              <th className="p-2 border">AMT</th>
            </tr>
          </thead>
          <tbody>
                {data.map((row, index) => {
                
                    return (
                      <tr key={index} className="odd:bg-white even:bg-gray-50">
                        <td className="p-2 border">
                          <input readOnly
                              type="text"
                              value={row.Date
                                  ? new Date(row.Date).toLocaleDateString()
                                  : "No date"}
                              className={`w-full border border-gray-300 px-2 py-1 rounded text-sm}`}
                            />
                        </td>
                
                        {['CN', 'VNO', 'FT', 'RT', 'QT', 'AMT'].map((field) => (
                          <td key={field} className="p-2 border">
                            <input readOnly
                              type="text"
                              value={row[field]}
                              
                              className={`w-full border border-gray-300 px-2 py-1 rounded text-sm}`}
                            />
                          </td>
                        ))}
                
                      </tr>
                    );
                  })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
