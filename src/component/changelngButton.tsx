"use client";
import { Select } from "antd";
import { useRouter, usePathname } from "next/navigation";

export default function ChangeLntButton({ params }: { params: { lng: string } }) {
  const router = useRouter();
  const pathname = usePathname(); 

  const onChangeLng = (lng: string) => {
    console.log("Changing language to:", lng);

    const updatedUrl = pathname.replace(/^(\/[a-z]{2})/, `/${lng}`);
    router.push(updatedUrl); 
  };

  return (
    <div>
      <Select
        defaultValue={params.lng || "en"} 
        style={{ width: 120 }}
        onChange={onChangeLng}
        options={[
          { value: "en", label: "English" },
          { value: "th", label: "ไทย" },
        ]}
      />
    </div>
  );
}
