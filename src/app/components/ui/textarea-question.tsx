"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";

type Props = {
  label: string;
  value: string;
  field: string;
  onChange: (field: string, value: string) => void;
};

export default function TextareaQuestion({
  label,
  value,
  field,
  onChange,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{label}</CardTitle>
      </CardHeader>

      <CardContent>
        <Textarea
          placeholder="Tulis jawaban Anda..."
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
        />
      </CardContent>
    </Card>
  );
}