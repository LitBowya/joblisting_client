import React from 'react'
import TopProfileSection from "@/app/(root)/profile/components/profile/TopProfileSection";
import CompanyPage from "@/app/(recruiter)/recruiter/company/page";

const RecruiterProfilePage = () => {
    return (


        <>
            <div className={'grid grid-cols-1 md:grid-cols-12 gap-6'}>
                <TopProfileSection />

            </div>
            <CompanyPage />

        </>
    )
}
export default RecruiterProfilePage
