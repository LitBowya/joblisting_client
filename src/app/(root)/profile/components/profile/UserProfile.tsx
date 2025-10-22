"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { User } from "@/types/user";

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <Card className="flex flex-col items-center p-6 space-y-4 border border-gray-100 shadow-md">
      <CardHeader className="w-full flex flex-col items-center space-y-3">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name,
            )}&background=4f46e5&color=fff`}
          />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <CardTitle className="font-semibold text-gray-900">
          {user.name}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {user.email}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-gray-500 text-sm text-center">{user.userType}</p>
      </CardContent>
    </Card>
  );
}
