import React from 'react'
import Layout from '../layout/Layout'
import CallList from '../components/CallList'
import MainCall from '../components/MainCall'
import NewCall from '../components/NewCall'

const Calls = () => {
    return (
        <div>
            <Layout>
                <CallList />
                {/* <NewCall /> */}
                <MainCall/>
        </Layout>
        </div>
    )
}

export default Calls
