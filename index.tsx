import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import axios from "axios";
import { Balance } from "~~/components/scaffold-eth";
import React, { useState, useEffect } from 'react';

import lighthouseABI from "~~/pages/lighthouseABI.json"

const Home: NextPage = () => {

  const {writeAsync: addRewards} = useScaffoldContractWrite({
    contractName: "DeFiModule",
    functionName: "addRewards",
    args: ["meow"],
    value: BigInt(100),
  });

  const {writeAsync: processRewards} = useScaffoldContractWrite({
    contractName: "DeFiModule",
    functionName: "processRewards",
    args: ["meow"],
  })

  const {data: getRewardsForCid} = useScaffoldContractRead({
    contractName: "DeFiModule",
    functionName:  "rewardForCid",
    args: ["meow"],
  }) 



  const { config } = usePrepareContractWrite({
    address: '0x6ec8722e6543fB5976a547434c8644b51e24785b',
    abi: lighthouseABI,
    functionName: 'submit',
  })
  const { data, isLoading, isSuccess, write: lighthouseSubmit } = useContractWrite(config)

  const register_job = async (): Promise<void> => {
    const formData = new FormData();
    const cid = "QmTgLAp2Ze2bv7WV2wnZrvtpR5pKJxZ2vtBxZPwr7rM61a";
    const requestReceivedTime = new Date();
    const endDate = new Date(requestReceivedTime);
    endDate.setMonth(requestReceivedTime.getMonth() + 1);
    const replicationTarget = 2;
    const epochs = 4; // how many epochs before the deal ends should the deal be renewed
    formData.append('cid', cid);
    formData.append('endDate', endDate.toString()); // Convert to string
    formData.append('replicationTarget', replicationTarget.toString()); // Convert to string
    formData.append('epochs', epochs.toString()); // Convert to string
  
    try {
      const response = await axios.post<string>(
        `https://calibration.lighthouse.storage/api/register_job`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };  



  const [numberInput, setNumberInput] = useState('');

  const handleAddRewards = (inputValue) => {
    // Use the inputValue here
    console.log(inputValue);
  };

const [inputValue, setInputValue] = useState(''); // To store the input value

  const handleClick = () => {
    // Handle the button click event
    console.log('Button was clicked with input value:', inputValue);
  };

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">

        <button className="btn btn-primary mb-4" onClick={() => handleAddRewards(numberInput)}> 
        <input 
          type="number" 
          className="mb-2 p-2 border rounded" 
          value={numberInput} 
          onChange={(e) => setNumberInput(e.target.value)}
          placeholder="Enter a number"
        />
        Add Rewards</button>
        <button className="btn btn-primary mb-4" onClick={processRewards}>Process Rewards</button>
        <button className="btn btn-primary mb-4" onClick={lighthouseSubmit}>
        <div>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Enter a string..."
        />
        <button onClick={handleClick}>Submit CID</button>
        </div>
          </button>
        <button className="btn btn-primary" onClick={register_job}>
        <div>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Enter a string..."
        />
        <button onClick={register_job}>Register CID</button>
        </div>
          </button>


      </div>
    </>
  );
};

export default Home;

// import { NumberInput, NumberInputField, Select } from '@chakra-ui/react'
// <NumberInputField></NumberInputField>