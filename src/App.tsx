import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import './App.css';

interface UsageData {
  coffee_machine_id: string;
  coffee_machine_name: string;
  water_supply_level: number;
  total_bean_supply_level: number;
  average_daily_bean_usage: number;
  average_daily_water_usage: number;
  water_supply_order_limit: number;
  bean_supply_order_limit: number;
  bean_supply_days: number;
  water_supply_days: number;
  bean_order_notify_days: number;
  water_order_notify_days: number;
}


const sensorURIData = [
  {
    name: 'A6',
    coffee_machine_id: 'apple06',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=wud_kPXJaJTkkwhu49ztFledy9ZDfost&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=wud_kPXJaJTkkwhu49ztFledy9ZDfost&v2'
  },

  {
    name: 'A7',
    coffee_machine_id: 'apple07',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=dR5_HJpvcZjjxwaXQSiEiQvJb0iFisUC&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=dR5_HJpvcZjjxwaXQSiEiQvJb0iFisUC&v2'
  },

  {
    name: 'A8',
    coffee_machine_id: 'apple08',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=UEyPvvW2On7qrC_gTQoUPJogO6oQe7up&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=UEyPvvW2On7qrC_gTQoUPJogO6oQe7up&v2'
  },

  {
    name: 'A14',
    coffee_machine_id: 'apple14',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=V3ZpShWOpkuP92f9JMvCsrpF7r413nV5&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=V3ZpShWOpkuP92f9JMvCsrpF7r413nV5&v2'
  },

  {
    name: 'A18',
    coffee_machine_id: 'apple18',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=fzjwp4Y4QQNK8h4KxF-n7oTIPKtYaTd7&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=fzjwp4Y4QQNK8h4KxF-n7oTIPKtYaTd7&v2'
  },

  {
    name: 'A23',
    coffee_machine_id: 'apple23',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=xLjhBmvz14D06eXjAX3ozXEOybahiwar&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=xLjhBmvz14D06eXjAX3ozXEOybahiwar&v2'
  },

  {
    name: 'A24',
    coffee_machine_id: 'apple24',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=EhIs79XytwhBgzHrjFn_MmOkJPMJyhRr&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=EhIs79XytwhBgzHrjFn_MmOkJPMJyhRr&v2'
  },

  {
    name: 'A26',
    coffee_machine_id: 'apple26',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=6yv16AVeJErV2S8-mOVuq2yr-DB9Ujdi&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=6yv16AVeJErV2S8-mOVuq2yr-DB9Ujdi&v2'
  },

  {
    name: 'A28',
    coffee_machine_id: 'apple28',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=9JFLtG3Ds1xCIyTZ4hl67JNL1LFsp4HU&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=9JFLtG3Ds1xCIyTZ4hl67JNL1LFsp4HU&v2'
  },

  {
    name: 'A29',
    coffee_machine_id: 'apple29',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=NPNKI5z7vhNRvMJa0LJhMOegod5aZ4wd&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=NPNKI5z7vhNRvMJa0LJhMOegod5aZ4wd&v2'
  },

  {
    name: 'A30',
    coffee_machine_id: 'apple30',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=QC5TkDS8Qr47ot0IbmimO4A0VbnPEdu0&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=QC5TkDS8Qr47ot0IbmimO4A0VbnPEdu0&v2'
  },

  {
    name: 'A32',
    coffee_machine_id: 'apple32',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=iJofjKJgb5Pgk7YGJG9csb6OINlNV1ku&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=iJofjKJgb5Pgk7YGJG9csb6OINlNV1ku&v2'
  },

  {
    name: 'A34',
    coffee_machine_id: 'apple34',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=UZLEw2es8x5hPVkrKUgVW78ZFi7nsJbJ&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=UZLEw2es8x5hPVkrKUgVW78ZFi7nsJbJ&v2'
  },

  {
    name: 'A37',
    coffee_machine_id: 'apple37',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=-dv9tMxIfSfuGAk_MmsAZulWlI9d5kus&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=-dv9tMxIfSfuGAk_MmsAZulWlI9d5kus&v2'
  },

  {
    name: 'A38',
    coffee_machine_id: 'apple38',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=e_qCO1fjSbusfXz9_vO1YbF6U2THVNF3&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=e_qCO1fjSbusfXz9_vO1YbF6U2THVNF3&v2'
  },

  {
    name: 'A39',
    coffee_machine_id: 'apple39',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=pGBbYr3DLE8w9J4yFtOBnQji1w8vEQYQ&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=pGBbYr3DLE8w9J4yFtOBnQji1w8vEQYQ&v2'
  },

  {
    name: 'A40',
    coffee_machine_id: 'apple40',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=PprgsiK6vP6Sdun8YtWKqnBdwxbZCN94&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=PprgsiK6vP6Sdun8YtWKqnBdwxbZCN94&v2'
  },

  {
    name: 'Mango1',
    coffee_machine_id: 'mango01',
    bean_uri: 'https://sgp1.blynk.cloud/external/api/get?token=lr2WAc9U9M8cPHztJAXn_nUoSuKqcazA&v0',
    water_uri: 'https://sgp1.blynk.cloud/external/api/get?token=lr2WAc9U9M8cPHztJAXn_nUoSuKqcazA&v2'
  },
]

function App() {

  const [usageData, setUsageData] = useState<UsageData[]>([])
  const [sensorData, setSensorData] = useState<any[]>([])

  const fetchUsageData = async () => {
    try {

      const response = await fetch('https://asia-east2-roco-friday-dev.cloudfunctions.net/fridayFirebaseServerEA2/v1/dashboard/supply-usage')
      const data = await response.json()
      setUsageData(data.data.map((item: any) => ({ ...item, name: item.coffee_machine_id })))
      console.log(data)
      return data.data

    } catch (error) {

    }
  }

  const fetchSensorData = async () => {
    try {
      const adata = await fetchUsageData()

      const allData = []

      for (let i = 0; i < sensorURIData.length; i++) {
        const beanResponse = await fetch(sensorURIData[i].bean_uri)
        const waterResponse = await fetch(sensorURIData[i].water_uri)
        const beanData = await beanResponse.json()
        const waterData = await waterResponse.json()

        const machineUsageData = adata.find((item: any) => item.coffee_machine_id === sensorURIData[i].coffee_machine_id)

        allData.push({
          name: sensorURIData[i].name,
          bean: beanData,
          water: waterData,
          coffee_machine_id: sensorURIData[i].coffee_machine_id,
          water_order_limit: machineUsageData.water_supply_order_limit,
          bean_order_limit: machineUsageData.bean_supply_order_limit,
          total_bean_supply_level: machineUsageData.total_bean_supply_level,
          ...machineUsageData
        })

      }
      console.log(allData)
      setSensorData(allData)

    } catch (error) {

    }
  }

  // this works when component is loaded
  useEffect(() => {

    fetchSensorData()

  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <BarChart
          width={500}
          height={300}
          data={[...sensorData].sort((a, b) => a.total_bean_supply_level - b.total_bean_supply_level)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_bean_supply_level">
            {
              usageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.total_bean_supply_level < entry.bean_supply_order_limit ? '#82ca9d' : '#4B4221'} />
              ))
            }
          </Bar>
        </BarChart>
        <BarChart
          width={500}
          height={300}
          data={sensorData.sort((a, b) => a.water - b.water)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="water">
            {
              sensorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.water * 1000 < entry.water_order_limit ? '#82ca9d' : '#8884d8'} />
              ))
            }
          </Bar>
        </BarChart>
      </div>
      <div><div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>Coffee Machine ID</th>
              <th>Water Supply Level</th>
              <th>Total Bean Supply Level</th>
              <th>Average Daily Bean Usage</th>
              <th>Average Daily Water Usage</th>
              <th>Water Supply Order Limit</th>
              <th>Bean Supply Order Limit</th>
              <th>Bean Supply Days</th>
              <th>Water Supply Days</th>
              <th>Bean Order Notify Days</th>
              <th>Water Order Notify Days</th>
            </tr>
          </thead>
          <tbody>
            {usageData.map((data: UsageData, index: number) => (
              <tr key={data.coffee_machine_id} style={{ backgroundColor: index % 2 ? '#f2f2f2' : 'white' }}>
                <td>{data.coffee_machine_id}</td>
                <td>{data.water_supply_level}</td>
                <td>{data.total_bean_supply_level}</td>
                <td>{data.average_daily_bean_usage}</td>
                <td>{data.average_daily_water_usage}</td>
                <td>{data.water_supply_order_limit}</td>
                <td>{data.bean_supply_order_limit}</td>
                <td>{data.bean_supply_days.toFixed(2)}</td>
                <td>{data.water_supply_days.toFixed(2)}</td>
                <td>{data.bean_order_notify_days.toFixed(2)}</td>
                <td>{data.water_order_notify_days.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div >
  )
}

export default App
