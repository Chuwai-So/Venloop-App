import { TokenAdapter } from './tokenAdapter';
import { handle } from '@/app/service/serviceHandler';

const TokenService = {
    async getTeamId(token) {
        return handle(TokenAdapter.getTeamId(token), "getting team ID from token");
    },

    async setGlobalEventToken() {
        return handle(TokenAdapter.setGlobalEventToken(), "setting global event token");
    },

    async getGlobalEventToken() {
        return handle(TokenAdapter.getGlobalEventToken(), "getting global event token");
    }
};

export default TokenService;
