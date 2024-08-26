import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            if (!user?.email) return false; // Handle case where email is undefined
            const res = await axiosSecure.get(`users/admin/${user.email}`);
            // console.log(res.data);
            return res.data?.admin;
        },
        enabled: !!user?.email, // Only run query if user email is available
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
