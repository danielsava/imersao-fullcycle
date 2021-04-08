import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// O retorno do Mongo é um 'Document'. Ele funciona como um repositório e possui outros metodos e atributos
export type RotaDocument = Rota & Document

@Schema()
export class Rota {

    @Prop()
    _id: string

    @Prop()
    title: string

    @Prop(
        raw({
            lat: { type: Number },
            lng: { type: Number }
        })
    )
    startPosition: { lat: number, lng: number}

    @Prop(
        raw({
            lat: { type: Number },
            lng: { type: Number }
        })
    )
    endPosition: { lat: number, lng: number }

}

export const RotaSchema = SchemaFactory.createForClass(Rota)
