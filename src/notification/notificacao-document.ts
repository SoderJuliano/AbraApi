import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NotificacaoDocument = HydratedDocument<Notificacao>;

@Schema()
export class Notificacao {
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    dateCreated: Date;
    @Prop()
    dateUpdated: Date;
    @Prop()
    application: string;
    @Prop()
    content: string;
    @Prop()
    isRed: boolean;
}

export const NotificacaoSchema = SchemaFactory.createForClass(Notificacao);