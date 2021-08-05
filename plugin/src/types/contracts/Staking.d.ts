/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface StakingInterface extends ethers.utils.Interface {
  functions: {
    "availablePool()": FunctionFragment;
    "calculateReward(uint256,uint256,uint256)": FunctionFragment;
    "cap()": FunctionFragment;
    "claimAttester()": FunctionFragment;
    "currentAPY()": FunctionFragment;
    "distributedReward()": FunctionFragment;
    "endDate()": FunctionFragment;
    "erc20()": FunctionFragment;
    "getCurrentReward(address)": FunctionFragment;
    "getMaxStakeReward(address)": FunctionFragment;
    "getStakedAmount(address)": FunctionFragment;
    "lockedReward()": FunctionFragment;
    "maxAmount()": FunctionFragment;
    "minAmount()": FunctionFragment;
    "owner()": FunctionFragment;
    "registry()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "stake(uint256,bytes)": FunctionFragment;
    "stakedAmount()": FunctionFragment;
    "startDate()": FunctionFragment;
    "subscriptions(address)": FunctionFragment;
    "totalPool()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdraw()": FunctionFragment;
    "withdrawPool()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "availablePool",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "calculateReward",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "cap", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "claimAttester",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "currentAPY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "distributedReward",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "endDate", values?: undefined): string;
  encodeFunctionData(functionFragment: "erc20", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getCurrentReward",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getMaxStakeReward",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getStakedAmount",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "lockedReward",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "maxAmount", values?: undefined): string;
  encodeFunctionData(functionFragment: "minAmount", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "registry", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stake",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "stakedAmount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "startDate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "subscriptions",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "totalPool", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawPool",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "availablePool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "cap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimAttester",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "currentAPY", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "distributedReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "endDate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "erc20", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMaxStakeReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStakedAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockedReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "maxAmount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "minAmount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakedAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "startDate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "subscriptions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalPool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawPool",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "Subscribed(address,uint256,uint256,uint256)": EventFragment;
    "Withdrawn(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Subscribed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawn"): EventFragment;
}

export class Staking extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: StakingInterface;

  functions: {
    availablePool(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "availablePool()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    calculateReward(
      _start: BigNumberish,
      _end: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "calculateReward(uint256,uint256,uint256)"(
      _start: BigNumberish,
      _end: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    cap(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "cap()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    claimAttester(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "claimAttester()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    currentAPY(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "currentAPY()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    distributedReward(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "distributedReward()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    endDate(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "endDate()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    erc20(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "erc20()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    getCurrentReward(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "getCurrentReward(address)"(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    getMaxStakeReward(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "getMaxStakeReward(address)"(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    getStakedAmount(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "getStakedAmount(address)"(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    lockedReward(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "lockedReward()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    maxAmount(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "maxAmount()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    minAmount(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "minAmount()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    owner(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "owner()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    registry(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "registry()"(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    stake(
      _amount: BigNumberish,
      claimSig: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "stake(uint256,bytes)"(
      _amount: BigNumberish,
      claimSig: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    stakedAmount(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "stakedAmount()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    startDate(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "startDate()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    subscriptions(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      active: boolean;
      subscriberAddress: string;
      startDate: BigNumber;
      stakedAmount: BigNumber;
      maxReward: BigNumber;
      withdrawAmount: BigNumber;
      withdrawDate: BigNumber;
      0: boolean;
      1: string;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: BigNumber;
      6: BigNumber;
    }>;

    "subscriptions(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      active: boolean;
      subscriberAddress: string;
      startDate: BigNumber;
      stakedAmount: BigNumber;
      maxReward: BigNumber;
      withdrawAmount: BigNumber;
      withdrawDate: BigNumber;
      0: boolean;
      1: string;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: BigNumber;
      6: BigNumber;
    }>;

    totalPool(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "totalPool()"(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    withdraw(overrides?: Overrides): Promise<ContractTransaction>;

    "withdraw()"(overrides?: Overrides): Promise<ContractTransaction>;

    withdrawPool(overrides?: Overrides): Promise<ContractTransaction>;

    "withdrawPool()"(overrides?: Overrides): Promise<ContractTransaction>;
  };

  availablePool(overrides?: CallOverrides): Promise<BigNumber>;

  "availablePool()"(overrides?: CallOverrides): Promise<BigNumber>;

  calculateReward(
    _start: BigNumberish,
    _end: BigNumberish,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "calculateReward(uint256,uint256,uint256)"(
    _start: BigNumberish,
    _end: BigNumberish,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  cap(overrides?: CallOverrides): Promise<BigNumber>;

  "cap()"(overrides?: CallOverrides): Promise<BigNumber>;

  claimAttester(overrides?: CallOverrides): Promise<string>;

  "claimAttester()"(overrides?: CallOverrides): Promise<string>;

  currentAPY(overrides?: CallOverrides): Promise<BigNumber>;

  "currentAPY()"(overrides?: CallOverrides): Promise<BigNumber>;

  distributedReward(overrides?: CallOverrides): Promise<BigNumber>;

  "distributedReward()"(overrides?: CallOverrides): Promise<BigNumber>;

  endDate(overrides?: CallOverrides): Promise<BigNumber>;

  "endDate()"(overrides?: CallOverrides): Promise<BigNumber>;

  erc20(overrides?: CallOverrides): Promise<string>;

  "erc20()"(overrides?: CallOverrides): Promise<string>;

  getCurrentReward(
    _subscriber: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getCurrentReward(address)"(
    _subscriber: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMaxStakeReward(
    _subscriber: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getMaxStakeReward(address)"(
    _subscriber: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getStakedAmount(
    _subscriber: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getStakedAmount(address)"(
    _subscriber: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  lockedReward(overrides?: CallOverrides): Promise<BigNumber>;

  "lockedReward()"(overrides?: CallOverrides): Promise<BigNumber>;

  maxAmount(overrides?: CallOverrides): Promise<BigNumber>;

  "maxAmount()"(overrides?: CallOverrides): Promise<BigNumber>;

  minAmount(overrides?: CallOverrides): Promise<BigNumber>;

  "minAmount()"(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  registry(overrides?: CallOverrides): Promise<string>;

  "registry()"(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  stake(
    _amount: BigNumberish,
    claimSig: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "stake(uint256,bytes)"(
    _amount: BigNumberish,
    claimSig: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  stakedAmount(overrides?: CallOverrides): Promise<BigNumber>;

  "stakedAmount()"(overrides?: CallOverrides): Promise<BigNumber>;

  startDate(overrides?: CallOverrides): Promise<BigNumber>;

  "startDate()"(overrides?: CallOverrides): Promise<BigNumber>;

  subscriptions(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<{
    active: boolean;
    subscriberAddress: string;
    startDate: BigNumber;
    stakedAmount: BigNumber;
    maxReward: BigNumber;
    withdrawAmount: BigNumber;
    withdrawDate: BigNumber;
    0: boolean;
    1: string;
    2: BigNumber;
    3: BigNumber;
    4: BigNumber;
    5: BigNumber;
    6: BigNumber;
  }>;

  "subscriptions(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<{
    active: boolean;
    subscriberAddress: string;
    startDate: BigNumber;
    stakedAmount: BigNumber;
    maxReward: BigNumber;
    withdrawAmount: BigNumber;
    withdrawDate: BigNumber;
    0: boolean;
    1: string;
    2: BigNumber;
    3: BigNumber;
    4: BigNumber;
    5: BigNumber;
    6: BigNumber;
  }>;

  totalPool(overrides?: CallOverrides): Promise<BigNumber>;

  "totalPool()"(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  withdraw(overrides?: Overrides): Promise<ContractTransaction>;

  "withdraw()"(overrides?: Overrides): Promise<ContractTransaction>;

  withdrawPool(overrides?: Overrides): Promise<ContractTransaction>;

  "withdrawPool()"(overrides?: Overrides): Promise<ContractTransaction>;

  callStatic: {
    availablePool(overrides?: CallOverrides): Promise<BigNumber>;

    "availablePool()"(overrides?: CallOverrides): Promise<BigNumber>;

    calculateReward(
      _start: BigNumberish,
      _end: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateReward(uint256,uint256,uint256)"(
      _start: BigNumberish,
      _end: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cap(overrides?: CallOverrides): Promise<BigNumber>;

    "cap()"(overrides?: CallOverrides): Promise<BigNumber>;

    claimAttester(overrides?: CallOverrides): Promise<string>;

    "claimAttester()"(overrides?: CallOverrides): Promise<string>;

    currentAPY(overrides?: CallOverrides): Promise<BigNumber>;

    "currentAPY()"(overrides?: CallOverrides): Promise<BigNumber>;

    distributedReward(overrides?: CallOverrides): Promise<BigNumber>;

    "distributedReward()"(overrides?: CallOverrides): Promise<BigNumber>;

    endDate(overrides?: CallOverrides): Promise<BigNumber>;

    "endDate()"(overrides?: CallOverrides): Promise<BigNumber>;

    erc20(overrides?: CallOverrides): Promise<string>;

    "erc20()"(overrides?: CallOverrides): Promise<string>;

    getCurrentReward(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getCurrentReward(address)"(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxStakeReward(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getMaxStakeReward(address)"(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStakedAmount(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getStakedAmount(address)"(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lockedReward(overrides?: CallOverrides): Promise<BigNumber>;

    "lockedReward()"(overrides?: CallOverrides): Promise<BigNumber>;

    maxAmount(overrides?: CallOverrides): Promise<BigNumber>;

    "maxAmount()"(overrides?: CallOverrides): Promise<BigNumber>;

    minAmount(overrides?: CallOverrides): Promise<BigNumber>;

    "minAmount()"(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    registry(overrides?: CallOverrides): Promise<string>;

    "registry()"(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    stake(
      _amount: BigNumberish,
      claimSig: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "stake(uint256,bytes)"(
      _amount: BigNumberish,
      claimSig: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    stakedAmount(overrides?: CallOverrides): Promise<BigNumber>;

    "stakedAmount()"(overrides?: CallOverrides): Promise<BigNumber>;

    startDate(overrides?: CallOverrides): Promise<BigNumber>;

    "startDate()"(overrides?: CallOverrides): Promise<BigNumber>;

    subscriptions(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      active: boolean;
      subscriberAddress: string;
      startDate: BigNumber;
      stakedAmount: BigNumber;
      maxReward: BigNumber;
      withdrawAmount: BigNumber;
      withdrawDate: BigNumber;
      0: boolean;
      1: string;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: BigNumber;
      6: BigNumber;
    }>;

    "subscriptions(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      active: boolean;
      subscriberAddress: string;
      startDate: BigNumber;
      stakedAmount: BigNumber;
      maxReward: BigNumber;
      withdrawAmount: BigNumber;
      withdrawDate: BigNumber;
      0: boolean;
      1: string;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: BigNumber;
      6: BigNumber;
    }>;

    totalPool(overrides?: CallOverrides): Promise<BigNumber>;

    "totalPool()"(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;

    "withdraw()"(overrides?: CallOverrides): Promise<void>;

    withdrawPool(overrides?: CallOverrides): Promise<void>;

    "withdrawPool()"(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    Subscribed(
      subscriber: null,
      date: null,
      stakedAmount: null,
      maxReward: null
    ): EventFilter;

    Withdrawn(subscriber: null, date: null, withdrawAmount: null): EventFilter;
  };

  estimateGas: {
    availablePool(overrides?: CallOverrides): Promise<BigNumber>;

    "availablePool()"(overrides?: CallOverrides): Promise<BigNumber>;

    calculateReward(
      _start: BigNumberish,
      _end: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateReward(uint256,uint256,uint256)"(
      _start: BigNumberish,
      _end: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cap(overrides?: CallOverrides): Promise<BigNumber>;

    "cap()"(overrides?: CallOverrides): Promise<BigNumber>;

    claimAttester(overrides?: CallOverrides): Promise<BigNumber>;

    "claimAttester()"(overrides?: CallOverrides): Promise<BigNumber>;

    currentAPY(overrides?: CallOverrides): Promise<BigNumber>;

    "currentAPY()"(overrides?: CallOverrides): Promise<BigNumber>;

    distributedReward(overrides?: CallOverrides): Promise<BigNumber>;

    "distributedReward()"(overrides?: CallOverrides): Promise<BigNumber>;

    endDate(overrides?: CallOverrides): Promise<BigNumber>;

    "endDate()"(overrides?: CallOverrides): Promise<BigNumber>;

    erc20(overrides?: CallOverrides): Promise<BigNumber>;

    "erc20()"(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentReward(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getCurrentReward(address)"(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxStakeReward(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getMaxStakeReward(address)"(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStakedAmount(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getStakedAmount(address)"(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lockedReward(overrides?: CallOverrides): Promise<BigNumber>;

    "lockedReward()"(overrides?: CallOverrides): Promise<BigNumber>;

    maxAmount(overrides?: CallOverrides): Promise<BigNumber>;

    "maxAmount()"(overrides?: CallOverrides): Promise<BigNumber>;

    minAmount(overrides?: CallOverrides): Promise<BigNumber>;

    "minAmount()"(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    registry(overrides?: CallOverrides): Promise<BigNumber>;

    "registry()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    stake(
      _amount: BigNumberish,
      claimSig: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "stake(uint256,bytes)"(
      _amount: BigNumberish,
      claimSig: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    stakedAmount(overrides?: CallOverrides): Promise<BigNumber>;

    "stakedAmount()"(overrides?: CallOverrides): Promise<BigNumber>;

    startDate(overrides?: CallOverrides): Promise<BigNumber>;

    "startDate()"(overrides?: CallOverrides): Promise<BigNumber>;

    subscriptions(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "subscriptions(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalPool(overrides?: CallOverrides): Promise<BigNumber>;

    "totalPool()"(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    withdraw(overrides?: Overrides): Promise<BigNumber>;

    "withdraw()"(overrides?: Overrides): Promise<BigNumber>;

    withdrawPool(overrides?: Overrides): Promise<BigNumber>;

    "withdrawPool()"(overrides?: Overrides): Promise<BigNumber>;
  };

  populateTransaction: {
    availablePool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "availablePool()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    calculateReward(
      _start: BigNumberish,
      _end: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "calculateReward(uint256,uint256,uint256)"(
      _start: BigNumberish,
      _end: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cap(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "cap()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    claimAttester(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "claimAttester()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    currentAPY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "currentAPY()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    distributedReward(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "distributedReward()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    endDate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "endDate()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    erc20(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "erc20()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentReward(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getCurrentReward(address)"(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaxStakeReward(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getMaxStakeReward(address)"(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStakedAmount(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getStakedAmount(address)"(
      _subscriber: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lockedReward(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "lockedReward()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "maxAmount()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "minAmount()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    registry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "registry()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    stake(
      _amount: BigNumberish,
      claimSig: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "stake(uint256,bytes)"(
      _amount: BigNumberish,
      claimSig: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    stakedAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "stakedAmount()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    startDate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "startDate()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    subscriptions(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "subscriptions(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalPool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "totalPool()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    withdraw(overrides?: Overrides): Promise<PopulatedTransaction>;

    "withdraw()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    withdrawPool(overrides?: Overrides): Promise<PopulatedTransaction>;

    "withdrawPool()"(overrides?: Overrides): Promise<PopulatedTransaction>;
  };
}