import { Text } from '@chakra-ui/react';
import type { NextPage } from 'next'
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store/store'
import { useEffect } from 'react';


const Profile: NextPage = () => {

  const auth = useSelector((state: RootState) => state.auth);

  return (
    <DashboardLayout>
        {/* <Text 
        fontSize={"3xl"}
        fontWeight={"bold"}
        >Profile
        </Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sint magnam saepe, repellat laborum corporis unde doloribus qui, hic eum accusamus quisquam ratione? Expedita natus dicta laboriosam eos? Consequatur, nobis.
        </Text>
        <code>{auth.username}</code> */}
        <img src='/banner.jpg' width='100%'/>
    </DashboardLayout>
  )
}

export default Profile