import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Billing() {
  const [open, setOpen] = useState(false);
  const [fsname, setFsname] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { fsid } = location.state || {};

  // useEffect(() => {
  //   if (fsid) {
  //     fetch(`https://localhost:7068/api/Users/FsGetUserData?fsid=${fsid}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setFsname(data.fsname);
  //       })
  //       .catch((error) => console.error('Error fetching user data:', error));
  //   }
  // }, [fsid]);

  const handleDownloadExcel = () => {
    window.location.href = '/files/ExcelFormat.xlsx';
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setMessage('Please upload a valid Excel file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const abuf = e.target.result;
      const wb = XLSX.read(abuf, { type: 'array' });
      const sheetName = wb.SheetNames[0];
      const ws = wb.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const headers = jsonData[0];
      console.log('Headers:', headers);
      console.log('data:', jsonData);

      const requiredColumns = ['Date', 'CN', 'VNO', 'FT', 'RT', 'QT', 'AMT'];
      const isValid = requiredColumns.every(col => headers.includes(col));
      if (!isValid) {
        setMessage('Required columns (Date, CN, VNO, FT, RT, QT, AMT) are missing');
        setData([]);
        return;
      }

      const rows = jsonData.slice(1).map((row) => ({
        fsid,
        selectedDate: selectedDate || '',
        Date: row[0],
        CN: row[1],
        VNO: row[2],
        FT: row[3],
        RT: row[4],
        QT: row[5],
        AMT: row[6],
        datePickerOpen: false,
      }));

      setData(rows);
      setMessage('');
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSendData = async () => {
    const filtered = data.filter(row =>
      row.Date || row.CN || row.VNO || row.FT || row.RT || row.QT || row.AMT
    );
    if (filtered.length === 0) {
      setMessage('No data to send');
      return;
    }

    const payload = filtered.map(row => ({
      fsid,
      selectedDate,
      Date: row.Date,
      CN: row.CN,
      VNO: row.VNO,
      FT: row.FT,
      RT: row.RT,
      QT: row.QT,
      AMT: row.AMT,
    }));

    try {
      const response = await fetch('https://localhost:7068/api/Users/FsInsertFsData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Data Successfully Saved");
        setMessage('');
      } else {
        setMessage('Error sending data to the server');
      }
    } catch (error) {
      setMessage('Error sending data to the server');
      console.error('Error:', error);
    }
  };

  const handleAddRow = () => {
    if (!selectedDate) {
      alert('Please select a Billing Date before adding a row.');
      return;
    }

    setData([
      ...data,
      {
        fsid,
        selectedDate,
        Date: '',
        CN: '',
        VNO: '',
        FT: '',
        RT: '',
        QT: '',
        AMT: '',
        datePickerOpen: false,
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

        {/* Upload & Download */}
        <div className="grid grid-rows-2 gap-2">
          <label
            htmlFor="excelUpload"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black cursor-pointer border hover:border-black transition text-sm"
          >
            Upload Details from Excel
          </label>
          <input
            id="excelUpload"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={handleDownloadExcel}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black cursor-pointer border hover:border-black transition text-sm"
          >
            Download Excel Format
          </button>
        </div>
      </div>

      {/* FS Info */}
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">FS Name</p>
        <p className="text-sm text-gray-700">{fsname || 'FS Details'}</p>
      </div>

      {message && <div className="text-red-600 mb-4">{message}</div>}

      {/* Table */}
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
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
  {data.map((row, index) => {
    // const isNew = !row.CN && !row.VNO && !row.FT && !row.RT && !row.QT && !row.AMT;

    return (
      <tr key={index} className="odd:bg-white even:bg-gray-50">
        <td className="p-2 border">
          <Popover
            open={row.datePickerOpen}
            onOpenChange={(open) => {
              const updated = [...data];
              updated[index].datePickerOpen = open;
              setData(updated);
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start font-normal"
              >
                {row.Date
                  ? new Date(row.Date).toLocaleDateString()
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={row.Date ? new Date(row.Date) : undefined}
                onSelect={(date) => {
                  const updated = [...data];
                  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                    .toISOString()
                    .split("T")[0];
                  updated[index].Date = localDate;
                  updated[index].datePickerOpen = false;
                  setData(updated);
                }}
                
              />
            </PopoverContent>
          </Popover>
        </td>

        {['CN', 'VNO', 'FT', 'RT', 'QT', 'AMT'].map((field) => (
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
            onClick={handleSendData}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-white hover:text-black cursor-pointer border hover:border-black transition text-sm"
          >
            Submit Data
          </button>
        )}
      </div>
    </div>
  );
}
