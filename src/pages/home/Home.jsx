import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import {userData} from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import {useEffect, useMemo, useState} from "react";
import {userService} from "../../services";

export default function Home() {
    const [userStats, setUserStats] = useState([]);
    console.log(userStats, '1212')
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );
    useEffect(() => {
        const getStats = async () => {
            try {
                const {data} = await userService.getUsersStats()
                // setUserStats(data)
                data.map((item) =>
                        setUserStats((prev) => [
                            ...prev,
                            {name: MONTHS[item._id - 1], "Active User": item.total}
                        ]))
            } catch (e) {
            }
        }
        getStats()
    }, [MONTHS])


    return (
        <div className="home">
            <FeaturedInfo/>
            <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
            <div className="homeWidgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    );
}
