"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  field: string;
  value: string;
  options: Option[];
  onChange: (field: string, value: string) => void;
};

export default function RadioQuestion({
  label,
  field,
  value,
  options,
  onChange,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{label}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              name={field}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(field, e.target.value)}
            />

            <span>{option.label}</span>
          </label>
        ))}
      </CardContent>
    </Card>
  );
}