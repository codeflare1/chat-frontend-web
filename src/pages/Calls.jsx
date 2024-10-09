import React from 'react'
import Layout from '../layout/Layout'
import CallList from '../components/CallList'
import MainCall from '../components/MainCall'

const Calls = () => {
    return (
        <div>
            <Layout>
                <CallList />
                <MainCall/>
        </Layout>
        </div>
    )
}

export default Calls
