import React from "react";
import { useState, useEffect } from "react";
import { groupBy, sumBy } from "lodash";
import { BarChart, CartesianGrid, Bar, XAxis, YAxis, Tooltip } from "recharts";

function Statistics() {
    const [trainings, setTrainings] = useState([]);
    const [stats, setStats] = useState([]);


    /* observes the training state array, groups the trainings, sums each one's total duration,
     sets these into the stats array. Clears the stats array on each pass to maintain unique objects */
    useEffect(() => {
        const groupedTrainings = groupBy(trainings, 'activity');
        setStats([]);
        for (const activity in groupedTrainings) {
            const totalTime = sumBy(groupedTrainings[activity], 'duration');
            setStats(stats => [...stats, {activity: activity, performed: totalTime}])
        }
    }, [trainings])

    useEffect(() => {
        fetchTrainings();
    }, []);

    // fetches all trainings, maps them into a state array as objects with activity and duration properties
    function fetchTrainings() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => data.map(training => 
            setTrainings(trainings => [...trainings, {
                activity: training.activity,
                duration: training.duration
                }])
            ))
        .catch(err => console.error(err))
    };


    return(
        <div style={{marginTop: 80}}>
            <BarChart width={600} height={400} data={stats}>
            <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity"/>
                <YAxis label={{ value: 'Total (min)', 
                angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="performed" fill="#8884d8"/>
            </BarChart>
        </div>
    )

}

export default Statistics;