"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Activity, AlertTriangle, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SMSHistory {
  id: number;
  username: string;
  contact: string;
  time: Date;
  message: string;
}

const initialSMSHistory: SMSHistory[] = [
  {
    id: 1,
    username: "John Doe",
    contact: "+1234567890",
    time: new Date("2024-03-20T10:30:00"),
    message: "Rapid decrease in meter units detected! Current units: 50",
  },
  {
    id: 2,
    username: "Jane Smith",
    contact: "+1987654321",
    time: new Date("2024-03-19T15:45:00"),
    message: "Units below threshold! Current units: 25",
  },
];

export function MeterDashboard() {
  const [currentUnits, setCurrentUnits] = useState(100);
  const [threshold, setThreshold] = useState(30);
  const [smsHistory] = useState<SMSHistory[]>(initialSMSHistory);

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Units</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUnits}</div>
            <p className="text-xs text-muted-foreground">
              Units remaining in meter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Threshold Settings
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="threshold">Alert Threshold (Units)</Label>
              <Input
                id="threshold"
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMS Status</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{smsHistory.length}</div>
            <p className="text-xs text-muted-foreground">
              Total notifications sent
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SMS History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration Since Sent</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {smsHistory.map((sms) => (
                <TableRow key={sms.id}>
                  <TableCell>{sms.username}</TableCell>
                  <TableCell>{sms.contact}</TableCell>
                  <TableCell>
                    {sms.time.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(sms.time, { addSuffix: true })}
                  </TableCell>
                  <TableCell>{sms.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}