"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Star } from "lucide-react";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export default function StarRating({ label, value, onChange }: Props) {
  const [hover, setHover] = useState(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{label}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => {
            const starValue = i + 1;

            return (
              <button
                key={i}
                type="button"
                onClick={() => onChange(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  className={`w-7 h-7 ${
                    starValue <= (hover || value)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}