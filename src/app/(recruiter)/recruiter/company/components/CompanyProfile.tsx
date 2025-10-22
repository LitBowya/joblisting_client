import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { getMyCompanyAction } from "@/app/(recruiter)/recruiter/company/companyActions";
import EditCompany from "./EditCompany";
import DeleteCompanyButton from "./DeleteCompanyButton";
import CreateCompany from "./CreateCompany";
import type { Company } from "@/types/company";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";

export default async function CompanyProfile() {
  const res = await getMyCompanyAction();
  const error = (res as any)?.error as string | undefined;
  const company = (res as any)?.company as Company | undefined;

  return (
    <Card className={'my-4'}>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-600">{error}</p>}

        {!error && !company && (
          <div className="space-y-4">
            <p className="text-gray-600">You don't have a company profile yet. Create one to get started.</p>
            <CreateCompany />
          </div>
        )}

        {company && (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
                <Avatar className={'size-32'}>
                    <AvatarImage
                        src={`https://ui-avatars.com/api/?name=${company.companyName}`}
                    />
                    <AvatarFallback>{company?.companyName[0]}</AvatarFallback>
                </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{company.companyName}</h3>
                {company.companyEmail && <p className="text-sm text-gray-600">{company.companyEmail}</p>}
                <p className="text-sm text-gray-500 mt-2">{company.industry || "-"} · {company.location || "-"}</p>
                {company.website && (
                  <p className="text-sm text-blue-600 hover:underline mt-1">
                    <a href={company.website} target="_blank" rel="noreferrer">{company.website}</a>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <h4 className="text-xs text-gray-500 uppercase">Phone</h4>
                <p className="text-sm">{company.companyPhone || "-"}</p>
              </div>

              <div>
                <h4 className="text-xs text-gray-500 uppercase">Email</h4>
                <p className="text-sm">{company.companyEmail || "-"}</p>
              </div>

              <div>
                <h4 className="text-xs text-gray-500 uppercase">Industry</h4>
                <p className="text-sm">{company.industry || "-"}</p>
              </div>

              <div>
                <h4 className="text-xs text-gray-500 uppercase">Location</h4>
                <p className="text-sm">{company.location || "-"}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {company && (
        <CardFooter>
          <div className="flex gap-2 ml-auto">
            <EditCompany company={company} />
            <DeleteCompanyButton companyName={company.companyName} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

