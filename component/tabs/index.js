import HorizontalTabs from "./horizontaltab";

export default function VerticalTab({children}){

    return (
        <div>
            <HorizontalTabs>
                {children}
            </HorizontalTabs>
        </div>
    )
}