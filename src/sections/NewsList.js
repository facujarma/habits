import NewCard from '@quotes/NewCard'
import React from 'react'

function NewsList() {
    return (
        <div className="flex flex-col gap-2 py-4 mt-6">
            <h3 className="justify-start text-[#C5C5C5] text-xl font-normal">Latest news:</h3>
            <p>
                Please, if reading this news makes you anxious, don't read them. Our goal is not to make you anxious.
            </p>
            <div className="flex flex-col gap-8 py-4">
                <NewCard
                    title={"Quitting vaping with varenicline effective for young people"}
                    text={"A new study shows that the medication varenicline (Chantix) helps young people quit vaping when combined with counseling."}
                    author={"statnews.com"}
                    href={"https://www.statnews.com/2025/04/23/quitting-vaping-e-cigarettes-varenicline-chantix-young-adults/?utm_source=chatgpt.com"}
                />
                <NewCard
                    title={"Vaping lawsuit settlement to fund Illinois cessation efforts"}
                    text={"Illinois will use a $24 million settlement with Juul to fund youth vaping prevention and cessation programs."}
                    author={"myjournalcourier.com"}
                    href={"https://www.myjournalcourier.com/news/article/vaping-lawsuit-settlement-fund-cessation-20275117.php?utm_source=chatgpt.com"}
                />
                <NewCard
                    title={"Britain opens first vaping clinic for kids as young as 11"}
                    text={"A new UK clinic treats youth addicted to e-cigarettes with behavioral support and nicotine replacement therapy."}
                    author={"thetimes.co.uk"}
                    href={"https://www.thetimes.co.uk/article/patients-as-young-as-11-treated-at-vaping-clinic-for-children-pxf68b06v?utm_source=chatgpt.com"}
                />
                <NewCard
                    title={"How a fix for smoking sparked a new crisis"}
                    text={"E-cigarettes were designed to help smokers quit, but have created a new health crisis among teens."}
                    author={"vox.com"}
                    href={"https://www.vox.com/public-health/410443/vaping-conundrum-public-health-youth-ecigarettes?utm_source=chatgpt.com"}
                />
            </div>
        </div>
    )
}

export default NewsList
