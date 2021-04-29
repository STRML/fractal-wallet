import AuthMiddleware from "@models/Connection/middlewares/AuthMiddleware";
import FractalWebpageMiddleware from "@models/Connection/middlewares/FractalWebpageMiddleware";

import ConnectionTypes from "@models/Connection/types";

import ContentScriptConnection from "@background/connection";

import AppStore from "@redux/stores/application";
import UserStore from "@redux/stores/user";
import { getAccount } from "@redux/stores/user/reducers/wallet/selectors";

import TokenTypes from "@models/Token/types";
import { getCredentials } from "@redux/stores/user/reducers/credentials/selectors";
import { ERROR_CREDENTIAL_NOT_FOUND } from "@background/Errors";

import EtherscanService from "@services/EtherscanService";
import { BigNumber } from "ethers";
import {
  getTokensContractsAddresses,
  getStakingContractsAddresses,
} from "@redux/stores/application/reducers/app/selectors";

export const getStakingDetails = ([token]: [TokenTypes], port: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const address = getAccount(UserStore.getStore().getState());

      const tokenContractAddress = getTokensContractsAddresses(
        AppStore.getStore().getState(),
      )[token];
      const stakingContractAddress = getStakingContractsAddresses(
        AppStore.getStore().getState(),
      )[token];
      const transaction = await ContentScriptConnection.invoke(
        ConnectionTypes.GET_STAKING_DETAILS_INPAGE,
        [address, tokenContractAddress, stakingContractAddress],
        port,
      );

      resolve(transaction);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const approveStake = (
  [amount, token]: [string, TokenTypes],
  port: string,
) =>
  new Promise<void | string>(async (resolve, reject) => {
    try {
      const address = getAccount(UserStore.getStore().getState());
      const tokenContractAddress = getTokensContractsAddresses(
        AppStore.getStore().getState(),
      )[token];
      const stakingContractAddress = getStakingContractsAddresses(
        AppStore.getStore().getState(),
      )[token];

      const serializedTransactionDetails = await ContentScriptConnection.invoke(
        ConnectionTypes.APPROVE_STAKE_INPAGE,
        [address, amount, tokenContractAddress, stakingContractAddress],
        port,
      );

      resolve(serializedTransactionDetails);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const stake = (
  [amount, token, level]: [string, TokenTypes, string],
  port: string,
) =>
  new Promise(async (resolve, reject) => {
    try {
      const address = getAccount(UserStore.getStore().getState());
      const credentials = getCredentials(UserStore.getStore().getState());
      const tokenContractAddress = getTokensContractsAddresses(
        AppStore.getStore().getState(),
      )[token];
      const stakingContractAddress = getStakingContractsAddresses(
        AppStore.getStore().getState(),
      )[token];

      // find credential
      const credential = credentials.getByField("level", level);

      if (!credential) {
        reject(ERROR_CREDENTIAL_NOT_FOUND(level));
        return;
      }

      const serializedTransactionDetails = await ContentScriptConnection.invoke(
        ConnectionTypes.STAKE_INPAGE,
        [
          address,
          amount,
          credential.serialize(),
          tokenContractAddress,
          stakingContractAddress,
        ],
        port,
      );

      resolve(serializedTransactionDetails);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const getTransactionEstimationTime = ([serializedGasPrice]: [string]) =>
  new Promise(async (resolve, reject) => {
    try {
      // parse gas fee
      const gasPrice = BigNumber.from(serializedGasPrice);

      // calculate estimated confirmation time
      const estimatedTime = await EtherscanService.getEstimationOfConfirmationTime(
        gasPrice,
      );

      if (estimatedTime) {
        resolve(estimatedTime.toJSON());
      }

      resolve(estimatedTime);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const getAllowedAmount = ([token]: [TokenTypes], port: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const address = getAccount(UserStore.getStore().getState());
      const tokenContractAddress = getTokensContractsAddresses(
        AppStore.getStore().getState(),
      )[token];
      const stakingContractAddress = getStakingContractsAddresses(
        AppStore.getStore().getState(),
      )[token];

      const serializedAllowedAmount = await ContentScriptConnection.invoke(
        ConnectionTypes.GET_ALLOWED_AMOUNT_INPAGE,
        [address, tokenContractAddress, stakingContractAddress],
        port,
      );

      resolve(serializedAllowedAmount);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const withdraw = ([token]: [TokenTypes], port: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const address = getAccount(UserStore.getStore().getState());
      const stakingContractAddress = getStakingContractsAddresses(
        AppStore.getStore().getState(),
      )[token];

      const serializedTransactionDetails = await ContentScriptConnection.invoke(
        ConnectionTypes.WITHDRAW_INPAGE,
        [address, stakingContractAddress],
        port,
      );

      resolve(serializedTransactionDetails);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

const Callbacks = {
  [ConnectionTypes.APPROVE_STAKE_BACKGROUND]: {
    callback: approveStake,
    middlewares: [new FractalWebpageMiddleware(), new AuthMiddleware()],
  },
  [ConnectionTypes.GET_ALLOWED_AMOUNT_BACKGROUND]: {
    callback: getAllowedAmount,
    middlewares: [new FractalWebpageMiddleware(), new AuthMiddleware()],
  },
  [ConnectionTypes.GET_STAKING_DETAILS_BACKGROUND]: {
    callback: getStakingDetails,
    middlewares: [new FractalWebpageMiddleware(), new AuthMiddleware()],
  },
  [ConnectionTypes.GET_TRANSACTION_ESTIMATION_TIME_BACKGROUND]: {
    callback: getTransactionEstimationTime,
    middlewares: [new FractalWebpageMiddleware(), new AuthMiddleware()],
  },
  [ConnectionTypes.STAKE_BACKGROUND]: {
    callback: stake,
    middlewares: [new FractalWebpageMiddleware(), new AuthMiddleware()],
  },
  [ConnectionTypes.WITHDRAW_BACKGROUND]: {
    callback: withdraw,
    middlewares: [new FractalWebpageMiddleware(), new AuthMiddleware()],
  },
};

export default Callbacks;
