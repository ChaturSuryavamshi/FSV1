import React, { useState } from 'react';
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Billing() {

  const [open, setOpen] = useState(false); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState([]);

  

  const handleAddRow = () => {
    if (!selectedDate) {
      alert('Please select a Billing Date before adding a row.');
      return;
    }

    setData([
      ...data,
      {
        FT:'ff',
        Tank_no:'gg',
        Den: 'ss',
        Total_liters: '12',
        Action: false,
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

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
        <div className="flex flex-col gap-3">
          <Label htmlFor="date" className="px-1">Billing Type</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
            </Select>
        </div>
      </div>

      

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-gray-800 font-semibold">
            <tr>
              <th className="p-2 border">FT</th>
              <th className="p-2 border">Tank number</th>
              <th className="p-2 border">Den</th>
              <th className="p-2 border">Total liters</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
  {data.map((row, index) => {
    // const isNew = !row.CN && !row.VNO && !row.FT && !row.RT && !row.QT && !row.AMT;

    return (
      <tr key={index} className="odd:bg-white even:bg-gray-50">
        
        {['FT', 'Tank_no', 'Den', 'Total_liters'].map((field) => (
          <td key={field} className="p-2 border">
            <input
              type="text"
              value={row[field]}
              onChange={(e) => handleInputChange(index, field, e.target.value)}
              className={`w-full border border-gray-300 px-2 py-1 rounded text-sm}`}
            />
          </td>
        ))}

        <td className="p-2 border text-center">
          <button
            onClick={() => handleDeleteRow(index)}
            className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-700 transition text-xs"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-6">
        <button
          onClick={handleAddRow}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-white hover:text-black cursor-pointer border hover:border-black transition text-sm"
        >
          Add New Row
        </button>
        {data.length > 0 && (
          <button
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-white hover:text-black cursor-pointer border hover:border-black transition text-sm"
          >
            Submit Data
          </button>
        )}
      </div>
    </div>
  );
}
