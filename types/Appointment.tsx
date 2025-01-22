import { ServicesType } from "@/types/Service";
import { UserType } from "@/types/auth/User";

export type AppointmentType = {
    id: number;
    userId: number;
    service_id: number;
    scheduled_at: string;
    status: string;
    created_at: string;
    updated_at: string;
    service: ServicesType;
    user: UserType;
};